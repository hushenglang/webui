package web.action.accountadmin;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

import web.util.DateUtil;

import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.gold.client.models.PaginationCriteria;
import com.gwghk.gold.client.models.StringUtil;
import com.gwghk.gold.client.models.WebUiBalanceReportResult;
import com.gwghk.gold.client.models.WebUiBalanceReportVo;
import com.gwghk.gold.client.models.WebUiCashBackReportResult;
import com.gwghk.gold.client.models.WebUiCashBackReportVo;
import com.gwghk.gold.client.models.WebUiConsignReportResult;
import com.gwghk.gold.client.models.WebUiConsignReportVo;
import com.gwghk.gold.client.models.WebUiProfitReportResult;
import com.gwghk.gold.client.models.WebUiProfitReportVo;
import com.gwghk.gold.client.models.WebUiTradeReportResult;
import com.gwghk.gold.client.models.WebUiTradeReportVo;
import com.gwghk.persistence.detached.dialet.OrderBy;



@SuppressWarnings("serial")
public class ReportFormAction extends BaseAction {
	public static final Logger logger = Logger.getLogger(ReportFormAction.class);
	
	
	private String uid;//UID表示交易单或订单号
	private String productId; // 产品的prdcode

	private String entry;	// Entry表示类别，0 平倉 1 開倉
	private String beiginTime;// 开始时间
	private String endTime;// 结束时间
	private String pangeNo; // 页码数 从0开始
	private String pageCount;// 每页显示条数
	
	private int iPageNo;
	private int iPageCount;

	private String orderType; // OrderType 表示类型，取值为1到6的整数。1为市价，2为限价，3为止蝕，4为自动替代，5为利息，6为调整

	private String dealType;

	private String reportType; // 报表类型
	
	private String cusTranCode;//额度报表: 項目
	private String rebateType; //優惠報表: 優惠類型 1: 回贈   2:代幣 

	
	private String orderFieldName;
	private boolean ascening;
	
	private OrderBy orderby;
	private PaginationCriteria paginationCriteria;
	
	//for download
	private int	xlsRowNumber;
	private String filename;
	private InputStream inputStream;
	
	private Map<String, String> transCodeMap;
	
	

	@Override
	protected String perform() {
		try{
			
		
		init();
		formatProp();
		
		if( !( isValidDate3Month(beiginTime) && isValidDate3Month(endTime)) && StringUtil.isNullOrEmpty(uid)){
			logger.debug("INVAL DATE: "+ beiginTime + " "+ endTime);
			return NONE;
		}
		adminLoginInfo = this.getLoginInfo();
		String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
				
		ApiResult result = null;			
		Boolean isDemo = this.getIsDemo();		
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}
	
		logger.debug(loginname + " is searching" + reportType);
		logger.debug("orderFieldName : "+orderFieldName);
		logger.debug("ascening : "+ascening);
		logger.debug("iPageNo : "+iPageNo);
		logger.debug("iPageCount : "+iPageCount);
		
		if("searchWeituo".equals(reportType)) {//委托记录			
			result = rs.getConsignReport(loginname, dealType, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, false);			
		}else if("searchTradeReport".equals(reportType)){//成交记录
			result = rs.getTradeReport(loginname, dealType, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, false);
		}else if("searchProfitReport".equals(reportType)){//盈亏记录
			result = rs.getProfitReport(loginname, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, false);			
		}else if("searchBalanceReport".equals(reportType)){//额度记录
			result = rs.getBalanceReport(loginname, cusTranCode, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, false);
		}else if("searchCashBackReport".equals(reportType)){//优惠记录			
			result = rs.getCashBackReport(loginname, rebateType, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, false);			
		}
								
		if(result != null)
		{
			responseJson(JSONObject.fromObject(result).toString());
			logger.debug(JSONObject.fromObject(result).toString());
		}
		
		}catch(Exception e){
			logger.error("", e);
		}
		return NONE;
	}
		
	public boolean isValidDate3Month(String date){
		if(!StringUtil.isNullOrEmpty(date)){
			Calendar formattedCalendar = DateUtil.parseCalendarSecondFormat(date);
			formattedCalendar.set(Calendar.MILLISECOND, 0);
			formattedCalendar.set(Calendar.HOUR_OF_DAY, 0);
			formattedCalendar.set(Calendar.MINUTE, 0);
			formattedCalendar.set(Calendar.SECOND, 0);
			formattedCalendar.set(Calendar.MILLISECOND, 0);
			
			Calendar todayBefore3Month = Calendar.getInstance();
			todayBefore3Month.add(Calendar.MONTH, -3);
			todayBefore3Month.set(Calendar.MILLISECOND, 0);
			todayBefore3Month.set(Calendar.HOUR_OF_DAY, 0);
			todayBefore3Month.set(Calendar.MINUTE, 0);
			todayBefore3Month.set(Calendar.SECOND, 0);
			todayBefore3Month.set(Calendar.MILLISECOND, 0);
			
			
			if(todayBefore3Month.compareTo(formattedCalendar) > 0){
				return false;
			}else{
				return true;
			}
			
		}else{
			return false;
		}
	}
	
	
	public String downloadReport(){
		init();
		
		if( !( isValidDate3Month(beiginTime) && isValidDate3Month(endTime)) && StringUtil.isNullOrEmpty(uid)){
			logger.debug("INVAL DATE: "+ beiginTime + " "+ endTime);
			return NONE;
		}
		
		if("downloadWeituo".equals(reportType)){
			
			logger.debug("Start download consign report ");
			return downloadConsignReport();
			
		}else if("downloadTradeReport".equals(reportType)){
			
			logger.debug("Start download trade report ");
			return downloadTradeReport();
			
		}else if("downloadProfitReport".equals(reportType)){
			
			logger.debug("Start download profit report ");
			return downloadProfitReport();
			
		}else if("downloadBalanceReport".equals(reportType)){
			
			logger.debug("Start download balance report ");
			return downloadBalanceReport();
			
		}else if("downloadCashBackReport".equals(reportType)){
			
			logger.debug("Start download consign report ");
			return downloadCashBackReport();
			
		}
		return null;
	}
	
	
	
	
	/**
	 * 委托記錄下載
	 * @return
	 */
	public String downloadConsignReport(){
		
		filename ="ConsignReport.xls";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		adminLoginInfo = this.getLoginInfo();
		String loginname =adminLoginInfo.getFcustomersParam().getLoginname();
		Boolean isDemo = this.getIsDemo();		
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}
		ApiResult result = rs.getConsignReport(loginname, dealType, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, true);


		ByteArrayOutputStream os  = new ByteArrayOutputStream();
		
		HSSFWorkbook wb = new HSSFWorkbook();
		CellStyle wbStyle = wb.createCellStyle();
		
		Sheet sheet = wb.createSheet("ConsignReport");
		
		String[] xlsHeaders = {this.getText("report.consignReport.consignnum"),//委托號
				this.getText("report.consignReport.type"),//類型
				this.getText("report.consignReport.direction"),//類別
				this.getText("report.consignReport.product"),//産品
				this.getText("report.consignReport.buySell"),//買/賣
				this.getText("report.consignReport.lot"),//手數
				this.getText("report.consignReport.limit"),//限價
				this.getText("report.consignReport.stopLoss"),//止蝕
				this.getText("report.consignReport.status"),//狀態
				this.getText("report.consignReport.deadline"),//期限
				this.getText("report.consignReport.consignTime"),//委托時間
				this.getText("report.consignReport.executionTime"),//執行時間
				this.getText("report.consignReport.orderNumer"),//訂單編號
				this.getText("report.consignReport.closeOrderId")};//平倉編號
		Row row = sheet.createRow(0);
		Cell cell = null;
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setFont(font);
		
		
		HSSFCellStyle centerstyle = wb.createCellStyle();
		HSSFFont headerfont = wb.createFont();
		headerfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		centerstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		centerstyle.setFont(font);
		centerstyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		
		xlsRowNumber = 0;
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		cell.setCellValue(this.getText("report.consignReport"));//委托記錄
		cell.setCellStyle(centerstyle);
		sheet.addMergedRegion(new CellRangeAddress(0,0,0, xlsHeaders.length -1));
		
		
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		
		for(int j = 1 ; j<= xlsHeaders.length; j++){
			cell.setCellValue(xlsHeaders[j-1]);
			cell.setCellStyle(style);
			cell = row.createCell(j);
		}
		try {
			
			if(result.getReturnObj() == null){
				return null;
			}
			
			
			Object[] returnObj = result.getReturnObj();
			WebUiConsignReportResult consignReportResult = (WebUiConsignReportResult)returnObj[0];
			
			if(consignReportResult.getList() != null && consignReportResult.getList().size() > 0){
				for(WebUiConsignReportVo vo : consignReportResult.getList()){
					
					row = sheet.createRow(xlsRowNumber++);
					cell = row.createCell(0);
					cell.setCellValue(getLast6String(vo.getOrderId()));
					
					cell = row.createCell(1);
					String type = "";
					if(vo.getValidflag() == 1 ){//進階委托
						type = this.getText("report.advancedCommissioned") ;
					}else{
						if(1 == vo.getOptype()){
							type = this.getText("report.limitPrice");//限价
						}else if(2 == vo.getOptype()){
							type = this.getText("report.stopLoss");//止蝕  
						}else if(3 == vo.getOptype()){
							type = this.getText("report.autoChange");//自动替代
						}else if(0 == vo.getOptype() || 4 == vo.getOptype()){
							type = this.getText("report.marketPrice");//市价
						}
					}
					
					cell.setCellValue(type);
					
					
					
					cell = row.createCell(2);
					cell.setCellValue("open".equals(vo.getDirection())?this.getText("report.open"): this.getText("report.close"));//開倉 平倉
					
					cell = row.createCell(3);
					cell.setCellValue(0 == vo.getProductId()?this.getText("report.gold"): this.getText("report.sliver"));//倫敦金  倫敦銀
					
					cell = row.createCell(4);
					cell.setCellValue(0 == vo.getOrdertype() ? this.getText("report.buy") : this.getText("report.sell"));//買 賣  
					
					
					cell = row.createCell(5);
					double lot = getDefaultDoubleValue(vo.getLot());
					cell.setCellValue(lot);
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(6);
					cell.setCellValue(getDefaultDoubleValue(vo.getProductId(), vo.getLimitprice()));
					cell.setCellStyle(wbStyle);

					cell = row.createCell(7);
					if(vo.getPrice() == null || new Double(getDefaultDoubleValue(vo.getProductId(), vo.getPrice())) <0.0001){
						cell.setCellValue("");
					}else{
						cell.setCellValue(getDefaultDoubleValue(vo.getProductId(), vo.getPrice()));
					}
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(8);
					String flagStatus = "";
					if(vo.getFlag() == -1 || vo.getFlag() == -7 || vo.getFlag() == -8){
						flagStatus = this.getText("report.manCancel"); //手動取消
					}else if(vo.getFlag()  < -1){
						flagStatus = this.getText("report.systemCancel");//系统取消
					}else{
						flagStatus = this.getText("report.execution");//執行
					}
					cell.setCellValue(flagStatus);
					
					cell = row.createCell(9);
					cell.setCellValue(0 == vo.getValidtype() ? this.getText("report.effectiveInDate"): this.getText("report.effectiveInWeekly"));//当日有效 当周有效
					
					cell = row.createCell(10);
					cell.setCellValue(sdf.format(vo.getOpentime()));
					
					cell = row.createCell(11);
					cell.setCellValue(sdf.format(vo.getInvalidtime()));
					
					cell = row.createCell(12);
					cell.setCellValue(getLast6String(vo.getBorderId()));
					
					cell = row.createCell(13);
					cell.setCellValue(getLast6String(vo.getCloseOrderId()));
					
					
					
					
				}
				
				
				
			}
			
			int[] defaultColWidth = { 3000,1500,1500,2000,1500,2000,3000,3000, 1500, 3000,  5000, 5000, 3000, 3000 };
			for(int h = 0; h < xlsHeaders.length; h++){
				  sheet.setColumnWidth(h, defaultColWidth[h]);  
			}
			
			
			wb.write(os);
			inputStream = new ByteArrayInputStream(os.toByteArray());
			//os.toByteArray();
			
		} catch (Exception e) {
			logger.error("", e);
		}finally {
			try {
				if(os != null)
					os.close();
			} catch (IOException e) {
				logger.error("", e);
			}
		}
		
		return "download";
		
	}
	
	
	/**
	 * 成交记录下載
	 * @return
	 */
	public String downloadTradeReport(){
		adminLoginInfo = this.getLoginInfo();
		String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
		Boolean isDemo = this.getIsDemo();
		
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}
		ApiResult result = rs.getTradeReport(loginname, dealType, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, true);		
		
		filename ="TradeReport.xls";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		
		ByteArrayOutputStream os  = new ByteArrayOutputStream();
		
		HSSFWorkbook wb = new HSSFWorkbook();
		CellStyle wbStyle = wb.createCellStyle();
		
		Sheet sheet = wb.createSheet("TradeReport");
		
		String[] xlsHeaders = {this.getText("report.tradeReport.tradetime"),//交易時間
				this.getText("report.tradeReport.orderId"),//訂單編號
				this.getText("report.tradeReport.type"),//類型
				this.getText("report.tradeReport.cateory"),//類別
				this.getText("report.tradeReport.product"),//產品
				this.getText("report.tradeReport.buySell"),//買/賣
				this.getText("report.tradeReport.lot"),//手數
				this.getText("report.tradeReport.soldPrice"),//成交價
				this.getText("report.tradeReport.priceseq"),// 报价序号
				this.getText("report.tradeReport.closeOrderId"),//平倉編號
				this.getText("report.tradeReport.cgseCode"),//交易編碼
				this.getText("report.tradeReport.cgsefee"),//交易編碼費
				this.getText("report.tradeReport.remark")};//備註
		Row row = sheet.createRow(0);
		Cell cell = null;
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setFont(font);
		
		
		HSSFCellStyle centerstyle = wb.createCellStyle();
		HSSFFont headerfont = wb.createFont();
		headerfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		centerstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		centerstyle.setFont(font);
		centerstyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		
		xlsRowNumber = 0;
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		cell.setCellValue(this.getText("report.tradeReport"));//成交记录
		cell.setCellStyle(centerstyle);
		sheet.addMergedRegion(new CellRangeAddress(0,0,0, xlsHeaders.length -1));
		
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		
		for(int j = 1 ; j<= xlsHeaders.length; j++){
			cell.setCellValue(xlsHeaders[j-1]);
			cell.setCellStyle(style);
			cell = row.createCell(j);
		}
		try {
			
			if(result.getReturnObj() == null){
				return null;
			}
			
			Object[] returnObj = result.getReturnObj();
			WebUiTradeReportResult tradeReportResult = (WebUiTradeReportResult)returnObj[0];
			
			if(tradeReportResult.getList() != null && tradeReportResult.getList().size() > 0){
				for(WebUiTradeReportVo vo : tradeReportResult.getList()){
					row = sheet.createRow(xlsRowNumber++);
					cell = row.createCell(0);
					cell.setCellValue(sdf.format(vo.getTradetime()));
					
					cell = row.createCell(1);
					cell.setCellValue(getLast6String(vo.getOrderid()));
					
					cell = row.createCell(2);
					String advancedConsign = vo.getAdvancedConsign();
					String advancedConsignType = "";
					if("1".equals(advancedConsign)){
						advancedConsignType = this.getText("report.advancedCommissioned");//进阶委托
					}else {
						if(1 == vo.getOptype()){
							advancedConsignType = this.getText("report.limitPrice");//限价
						}else if(2 == vo.getOptype()){
							advancedConsignType = this.getText("report.stopLoss");//止蝕  
						}else if(3 == vo.getOptype()){
							advancedConsignType = this.getText("report.autoChange");//自动替代
						}else if(0 == vo.getOptype() || 4 == vo.getOptype()){
							advancedConsignType = this.getText("report.marketPrice");//市价
						}
					}
					cell.setCellValue(advancedConsignType);
					
					
					cell = row.createCell(3);
					cell.setCellValue("open".equals(vo.getConsigntype())?this.getText("report.open"): this.getText("report.close"));//開倉 平倉
					
					cell = row.createCell(4);
					cell.setCellValue("022".equals(vo.getProductcode())?this.getText("report.gold"): this.getText("report.sliver"));//倫敦金  倫敦銀
					
					cell = row.createCell(5);
					cell.setCellValue(0 == vo.getOrdertype()? this.getText("report.buy") : this.getText("report.sell"));//買 賣 
					
					cell = row.createCell(6);
					cell.setCellValue(getDefaultDoubleValue(vo.getLot()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(7);
					cell.setCellValue(getDefaultDoubleValue(vo.getProductcode(), vo.getTradeprice()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(8);
					cell.setCellValue(vo.getPriceseq());
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(9);
					cell.setCellValue(getLast6String(vo.getCloseorderid()));
					
					cell = row.createCell(10);
					String cgseCode = vo.getCgse_code();
					String cgseCodeType = "";
					if(!StringUtil.isNullOrEmpty(cgseCode)){
						cgseCodeType = cgseCode.indexOf("REJECT") >0 ? cgseCode : "";
					}
					cell.setCellValue(cgseCodeType);
					
					cell = row.createCell(11);
					if(vo.getCgse_fee() != null){
						cell.setCellValue(getDefaultDoubleValue(vo.getCgse_fee()) != 0 ? getDefaultDoubleValue(vo.getCgse_fee()) + " USD" : "");
					}else{
						cell.setCellValue("");
					}
					
					
					
					cell = row.createCell(12);
					cell.setCellValue("8".equals(vo.getChannel()) ? this.getText("report.emergencyClose") : ""); //紧急平仓
					
					
				}
				
				
				
			}
			
			int[] defaultColWidth = { 5000, 3500, 3000, 2000, 1500, 2000, 3000, 3000, 3500, 3000, 3000, 3000, 3000 };
			for(int h = 0; h < xlsHeaders.length; h++){
				  sheet.setColumnWidth(h, defaultColWidth[h]);  
			}
			
			
			wb.write(os);
			inputStream = new ByteArrayInputStream(os.toByteArray());
			//os.toByteArray();
			
		} catch (Exception e) {
			logger.error("", e);
		}finally {
			try {
				if(os != null)
					os.close();
			} catch (IOException e) {
				logger.error("", e);
			}
		}
		
		
		
		return "download";
		
	}
	
	
	/**
	 * 盈亏记录下載
	 * @return
	 */
	public String downloadProfitReport(){
		adminLoginInfo = this.getLoginInfo();
		String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
		Boolean isDemo = this.getIsDemo();
		
		ApiResult result = null;
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}
		
		result = rs.getProfitReport(loginname, uid, productId, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, true);
				
		
		filename ="ProfitReport.xls";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		
		ByteArrayOutputStream os  = new ByteArrayOutputStream();
		
		HSSFWorkbook wb = new HSSFWorkbook();
		CellStyle wbStyle = wb.createCellStyle();
		
		Sheet sheet = wb.createSheet("ProfitReport");
		
		String[] xlsHeaders = {this.getText("report.profitReport.product"),//產品
				this.getText("report.profitReport.type"),//類型
				this.getText("report.profitReport.closeOrderId"),//平倉編號
				this.getText("report.profitReport.buySell"),//買/賣
				this.getText("report.profitReport.closeLot"),//平倉手數
				this.getText("report.profitReport.closePrice"),//平倉價格
				this.getText("report.profitReport.orderId"),//訂單編號
				this.getText("report.profitReport.openLot"),//開倉手數
				this.getText("report.profitReport.openPrice"),//開倉價格
				this.getText("report.profitReport.interest"),//利息
				this.getText("report.profitReport.profit"),//淨盈虧
				this.getText("report.profitReport.cashback"),//回贈金價
				this.getText("report.profitReport.openTime"),//開倉時間
				this.getText("report.profitReport.closeTime"),//平倉時間
				this.getText("report.profitReport.remark")};//備註
		Row row = sheet.createRow(0);
		Cell cell = null;
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setFont(font);
		
		
		HSSFCellStyle centerstyle = wb.createCellStyle();
		HSSFFont headerfont = wb.createFont();
		headerfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		centerstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		centerstyle.setFont(font);
		centerstyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		
		xlsRowNumber = 0;
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		cell.setCellValue(this.getText("report.profitReport"));//盈亏记录
		cell.setCellStyle(centerstyle);
		sheet.addMergedRegion(new CellRangeAddress(0,0,0, xlsHeaders.length -1));
		
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		
		for(int j = 1 ; j<= xlsHeaders.length; j++){
			cell.setCellValue(xlsHeaders[j-1]);
			cell.setCellStyle(style);
			cell = row.createCell(j);
		}
		try {
			
			if(result.getReturnObj() == null){
				return null;
			}
			
			Object[] returnObj = result.getReturnObj();
			WebUiProfitReportResult profitReportResult = (WebUiProfitReportResult)returnObj[0];
			
			if(profitReportResult.getList() != null && profitReportResult.getList().size() > 0){
				for(WebUiProfitReportVo vo : profitReportResult.getList()){
					row = sheet.createRow(xlsRowNumber++);
					cell = row.createCell(0);
					cell.setCellValue("022".equals(vo.getProductcode())?this.getText("report.gold"): this.getText("report.sliver"));//倫敦金  倫敦銀
					
					cell = row.createCell(1);
					String advancedConsign = vo.getAdvancedConsign();
					String advancedConsignType = "";
					if("1".equals(advancedConsign)){
						advancedConsignType = this.getText("report.advancedCommissioned");//进阶委托
					}else {
						if(1 == vo.getOptype()){
							advancedConsignType = this.getText("report.limitPrice");//限价
						}else if(2 == vo.getOptype()){
							advancedConsignType = this.getText("report.stopLoss");//止蝕  
						}else if(3 == vo.getOptype()){
							advancedConsignType = this.getText("report.autoChange");//自动替代
						}else if(0 == vo.getOptype() || 4 == vo.getOptype()){
							advancedConsignType = this.getText("report.marketPrice");//市价
						}
					}
					cell.setCellValue(advancedConsignType);
					
					cell = row.createCell(2);
					cell.setCellValue(getLast6String(vo.getOrderid()));
					
					cell = row.createCell(3);
					cell.setCellValue(0 == vo.getOrdertype() ? this.getText("report.buy") : this.getText("report.sell"));//買 賣
					
					cell = row.createCell(4);
					cell.setCellValue(getDefaultDoubleValue(vo.getLot()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(5);
					cell.setCellValue(getDefaultDoubleValue(vo.getProductcode(), vo.getClosedprice()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(6);
					cell.setCellValue(getLast6String(vo.getBorderid()));
					
					cell = row.createCell(7);
					cell.setCellValue(getDefaultDoubleValue(vo.getOldlot()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(8);
					cell.setCellValue(getDefaultDoubleValue(vo.getProductcode(), vo.getOpenedprice()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(9);
					cell.setCellValue(getDefaultDoubleValue(vo.getInterest()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(10);
					cell.setCellValue(getDefaultDoubleValue(vo.getProfit()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(11);
					cell.setCellValue(getDefaultDoubleValue(vo.getCashback()) < 0.0001 ? 0.00 : getDefaultDoubleValue(vo.getCashback()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(12);
					cell.setCellValue(sdf.format(vo.getOpenedtime()));
					
					cell = row.createCell(13);
					cell.setCellValue(sdf.format(vo.getClosedtime()));
					
					cell = row.createCell(14);
					cell.setCellValue(vo.getRemark() > 3 || vo.getRemark() < 0 ? this.getText("report.systemClose"):"");//系统平仓
					
				}//end of for loop
			}//end of if check
			
			
		
			
			//增加總計 footer
			row = sheet.createRow(xlsRowNumber++);
			cell = row.createCell(0); cell.setCellValue(this.getText("report.total"));//總計
			cell = row.createCell(1); cell.setCellValue("");
			cell = row.createCell(2); cell.setCellValue("");
			cell = row.createCell(3); cell.setCellValue("");
			cell = row.createCell(4); cell.setCellValue(getDefaultDoubleValue(profitReportResult.getTotalclosedlot())); cell.setCellStyle(wbStyle);
			cell = row.createCell(5); cell.setCellValue("");
			cell = row.createCell(6); cell.setCellValue("");
			cell = row.createCell(7); cell.setCellValue(getDefaultDoubleValue(profitReportResult.getTotalopenlot())); cell.setCellStyle(wbStyle);
			cell = row.createCell(8); cell.setCellValue("");
			cell = row.createCell(9); cell.setCellValue(getDefaultDoubleValue(profitReportResult.getTotalinterest())); cell.setCellStyle(wbStyle);
			cell = row.createCell(10); cell.setCellValue(getDefaultDoubleValue(profitReportResult.getTotalprofit())); cell.setCellStyle(wbStyle);
			cell = row.createCell(11); cell.setCellValue(getDefaultDoubleValue(profitReportResult.getTotalcashback())); cell.setCellStyle(wbStyle);
			cell = row.createCell(12); cell.setCellValue("");
			cell = row.createCell(13); cell.setCellValue("");
			cell = row.createCell(14); cell.setCellValue("");
			
			int[] defaultColWidth = { 3000,3000,3000,2000,3000,2000,3000,3000, 3000, 3000,  3000 ,  3000 , 5000, 5000, 5000, 3000};
			for(int h = 0; h < xlsHeaders.length; h++){
				  sheet.setColumnWidth(h, defaultColWidth[h]);  
			}
			
			
			wb.write(os);
			inputStream = new ByteArrayInputStream(os.toByteArray());
			
		} catch (Exception e) {
			logger.error("", e);
		}finally {
			try {
				if(os != null)
					os.close();
			} catch (IOException e) {
				logger.error("", e);
			}
		}
		
		return "download";
		
	}
	
	/**
	 * 额度记录下載
	 * @return
	 */
	public String downloadBalanceReport(){
		adminLoginInfo = this.getLoginInfo();
		String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
		Boolean isDemo = this.getIsDemo();
		
		ApiResult result = null;	
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}
		result = rs.getBalanceReport(loginname,  cusTranCode, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, true);
		
				
		filename ="BalanceReport.xls";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			
		
		ByteArrayOutputStream os  = new ByteArrayOutputStream();
		
		HSSFWorkbook wb = new HSSFWorkbook();
		CellStyle wbStyle = wb.createCellStyle();
		DataFormat doubleFormat = wb.createDataFormat();
		wbStyle.setDataFormat(doubleFormat.getFormat("#0.00"));
		
		Sheet sheet = wb.createSheet("BalanceReport");
	
		String[] xlsHeaders = {this.getText("report.balanceReport.time"),//時間
				this.getText("report.balanceReport.option"),//項目
				this.getText("report.balanceReport.priceBeforeTrade"),//交易前賬戶餘價
				this.getText("report.balanceReport.income"),//收入
				this.getText("report.balanceReport.expend"),//支出
				this.getText("report.balanceReport.priceAferTrade"),//交易後賬戶餘價
				this.getText("report.balanceReport.seqNumer"),//流水號
				this.getText("report.balanceReport.remark")};//備註
		Row row = sheet.createRow(0);
		Cell cell = null;
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setFont(font);
		
		
		HSSFCellStyle centerstyle = wb.createCellStyle();
		HSSFFont headerfont = wb.createFont();
		headerfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		centerstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		centerstyle.setFont(font);
		centerstyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		
		xlsRowNumber = 0;
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		cell.setCellValue(this.getText("report.balanceReport"));//额度记录
		cell.setCellStyle(centerstyle);
		sheet.addMergedRegion(new CellRangeAddress(0,0,0, xlsHeaders.length -1));
		
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		
		for(int j = 1 ; j<= xlsHeaders.length; j++){
			cell.setCellValue(xlsHeaders[j-1]);
			cell.setCellStyle(style);
			cell = row.createCell(j);
		}
		try {
			
			if(result.getReturnObj() == null){
				return null;
			}
			
			Object[] returnObj = result.getReturnObj();
			WebUiBalanceReportResult balanceReportResult = (WebUiBalanceReportResult)returnObj[0];
			
			if(balanceReportResult.getList() != null && balanceReportResult.getList().size() > 0){
				for(WebUiBalanceReportVo vo : balanceReportResult.getList()){
					row = sheet.createRow(xlsRowNumber++);
					cell = row.createCell(0);
					cell.setCellValue(sdf.format(vo.getJointime()));
					
					cell = row.createCell(1);
					cell.setCellValue(getTranCodeValue(vo.getCode()));
					
					cell = row.createCell(2);
					cell.setCellValue(getDefaultDoubleValue(vo.getSrc_amount()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(3);
					if( !(vo.getIncome() == null || vo.getIncome().doubleValue() == 0) ){
						cell.setCellValue(getDefaultDoubleValue(vo.getIncome()));
						cell.setCellStyle(wbStyle);
					}
					
					
					
					cell = row.createCell(4);
					if( !(vo.getExpend() == null || vo.getExpend().doubleValue() == 0) ){
						cell.setCellValue(getDefaultDoubleValue(vo.getExpend()));
						cell.setCellStyle(wbStyle);
					}
				
					cell = row.createCell(5);
					cell.setCellValue(getDefaultDoubleValue(vo.getDst_amount()));
					cell.setCellStyle(wbStyle);
					
					cell = row.createCell(6);
					cell.setCellValue(getLast6String(vo.getTradeno()));
					
					cell = row.createCell(7);
					cell.setCellValue(vo.getRemark());
				}// end for loop
			}// end if check
			
	
			
			//增加總計 footer
			row = sheet.createRow(xlsRowNumber++);
			cell = row.createCell(0); cell.setCellValue("");
			cell = row.createCell(1); cell.setCellValue(this.getText("report.total"));//總計
			cell = row.createCell(2); cell.setCellValue("");
			cell = row.createCell(3); cell.setCellValue(getDefaultDoubleValue(balanceReportResult.getTotalincome())); cell.setCellStyle(wbStyle);
			cell = row.createCell(4); cell.setCellValue(getDefaultDoubleValue(balanceReportResult.getTotalexpend())); cell.setCellStyle(wbStyle);
			cell = row.createCell(5); cell.setCellValue("");
			cell = row.createCell(6); cell.setCellValue("");
			cell = row.createCell(7); cell.setCellValue("");
		
			
			int[] defaultColWidth = { 5000,3000,5000,3000,3000,5000,3000, 3000};
			for(int h = 0; h < xlsHeaders.length; h++){
				  sheet.setColumnWidth(h, defaultColWidth[h]);  
			}
			
			
			wb.write(os);
			inputStream = new ByteArrayInputStream(os.toByteArray());
			
		} catch (Exception e) {
			logger.error("", e);
		}finally {
			try {
				if(os != null)
					os.close();
			} catch (IOException e) {
				logger.error("", e);
			}
		}
		
		return "download";
		
	}
	
	
	
	/**
	 * 优惠记录下載
	 * @return
	 */
	public String downloadCashBackReport(){
		adminLoginInfo = this.getLoginInfo();
		String loginname = adminLoginInfo.getFcustomersParam().getLoginname();
		Boolean isDemo = this.getIsDemo();
		
		ApiResult result = null;	
		ReportService rs = null;
		if(isDemo){
			rs = ReportServiceDemo.getReportService();
		}else{
			rs = ReportServiceReal.getReportService();
		}		
		result = rs.getCashBackReport(loginname, rebateType, beiginTime, endTime, ascening, orderFieldName, iPageNo, iPageCount, true);
		
		
		filename ="CashBack.xls";
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		
		ByteArrayOutputStream os  = new ByteArrayOutputStream();
		
		HSSFWorkbook wb = new HSSFWorkbook();
		CellStyle wbStyle = wb.createCellStyle();
		DataFormat doubleFormat = wb.createDataFormat();
		wbStyle.setDataFormat(doubleFormat.getFormat("#0.00"));
		
		Sheet sheet = wb.createSheet("CashBack");
		
		String[] xlsHeaders = {this.getText("report.cashBackReport.category"),//類別
				this.getText("report.cashBackReport.date"),//日期
				this.getText("report.cashBackReport.discountPerLot"),//每手優惠金額
				this.getText("report.cashBackReport.lotOffer"),//優惠手數
				this.getText("report.cashBackReport.lotAmountOffer"),//已用優惠手數/金額
				this.getText("report.cashBackReport.availableLotOffer"),//可用優惠手數
				this.getText("report.cashBackReport.availableAmountOffer"),//可用優惠金額
				this.getText("report.cashBackReport.deadline")};//到期日
		Row row = sheet.createRow(0);
		Cell cell = null;
		HSSFCellStyle style = wb.createCellStyle();
		HSSFFont font = wb.createFont();
		font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		style.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		style.setFont(font);
		
		
		HSSFCellStyle centerstyle = wb.createCellStyle();
		HSSFFont headerfont = wb.createFont();
		headerfont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
		centerstyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
		centerstyle.setFont(font);
		centerstyle.setAlignment(CellStyle.ALIGN_CENTER);
		
		
		xlsRowNumber = 0;
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		cell.setCellValue(this.getText("report.cashBackReport"));//优惠记录
		cell.setCellStyle(centerstyle);
		sheet.addMergedRegion(new CellRangeAddress(0,0,0, xlsHeaders.length -1));
		
		row = sheet.createRow(xlsRowNumber++);
		cell = row.createCell(0);
		
		for(int j = 1 ; j<= xlsHeaders.length; j++){
			cell.setCellValue(xlsHeaders[j-1]);
			cell.setCellStyle(style);
			cell = row.createCell(j);
		}
		try {
			
			if(result.getReturnObj() == null){
				return null;
			}
			
			Object[] returnObj = result.getReturnObj();
			WebUiCashBackReportResult cashBackReportResult = (WebUiCashBackReportResult)returnObj[0];
			
			if(cashBackReportResult.getList() != null && cashBackReportResult.getList().size() > 0){
				for(WebUiCashBackReportVo vo : cashBackReportResult.getList()){
					row = sheet.createRow(xlsRowNumber++);
					cell = row.createCell(0);
					String cashBackType ="";
					if(vo.getCashbacktype()  ==1){
						if(vo.getMethod() == 1){
							cashBackType = this.getText("report.departmemtDonatedMoney");//汇赠钱
						}else if(vo.getMethod() == 2){
							cashBackType = this.getText("report.networkDonatedMoney");//网赠钱
						}
					}else if(vo.getCashbacktype() == 2){
						if(vo.getMethod() == 1) cashBackType = this.getText("report.tokenDeposit");//代币优惠
						else if(vo.getMethod() == 2) cashBackType = this.getText("report.tokenExpire");//代币到期
						else if(vo.getMethod() == 3) cashBackType = this.getText("report.tokenCommission");//代币佣金
						else if(vo.getMethod() == 4) cashBackType = this.getText("report.tokenProfit");//代币盈亏
						else if(vo.getMethod() == 5) cashBackType = this.getText("report.tokenBrokerage");//代币经纪佣金
					}
					cell.setCellValue(cashBackType);
					
					cell = row.createCell(1);
					cell.setCellValue(vo.getCashbacktype() == 2? sdf.format(vo.getJointime()) : "");
					
					cell = row.createCell(2);
					cell.setCellValue(vo.getAmountPL());
					
					cell = row.createCell(4);
					cell.setCellValue(vo.getUsedlot());
					
					cell = row.createCell(5);
					cell.setCellValue(vo.getAblelot());
					
					cell = row.createCell(6);
					cell.setCellValue(getDefaultDoubleValue(vo.getAbleamount()));cell.setCellStyle(wbStyle);
					
					cell = row.createCell(7);
					cell.setCellValue(sdf.format(vo.getDeadline()));
					
					
				}//end for loop			
				
			}//end if check
			
			row = sheet.createRow(xlsRowNumber++);
			cell = row.createCell(0); cell.setCellValue(this.getText("report.consignReport.totalname"));//總可用優惠金額
			cell = row.createCell(1); cell.setCellValue("");
			cell = row.createCell(2); cell.setCellValue("");
			cell = row.createCell(3); cell.setCellValue("");
			cell = row.createCell(4); cell.setCellValue("");
			cell = row.createCell(5); cell.setCellValue("");
			cell = row.createCell(6); cell.setCellValue(getDefaultDoubleValue(cashBackReportResult.getTotalAbleamount())); cell.setCellStyle(wbStyle);
			cell = row.createCell(7); cell.setCellValue("");
		
			int[] defaultColWidth = { 3000,5000,3000,3000,5000,4000,3000, 5000};
			for(int h = 0; h < xlsHeaders.length; h++){
				  sheet.setColumnWidth(h, defaultColWidth[h]);  
			}
			
			
			wb.write(os);
			inputStream = new ByteArrayInputStream(os.toByteArray());
			
		} catch (Exception e) {
			logger.error("", e);
		}finally {
			try {
				if(os != null)
					os.close();
			} catch (IOException e) {
				logger.error("", e);
			}
		}
		
		return "download";
	}
	public String getTranCodeValue(String key){
		return transCodeMap.get(key);
	}
	
	public String getLast6String(String input){
		String result = input;
		if(StringUtil.isNullOrEmpty(result)){
			input = "";
		}else if(result.length() > 6){
			result = input.substring(result.length() -6, result.length());
		}
		
		return result;
	}
	
	public String getDefaultDoubleValue(int prdid, BigDecimal bigDecimal) {
		if (bigDecimal != null) {
			if (prdid == 0) {
				String tmpResult = bigDecimal.setScale(2, RoundingMode.HALF_UP).toString();
				return tmpResult;
			} else {
				String tmpResult = bigDecimal.setScale(3, RoundingMode.HALF_UP).toString();
				return tmpResult;
			}
		} else {
			return "0.00";
		}
	}

	public String getDefaultDoubleValue(String prdcode, BigDecimal bigDecimal) {
		if (bigDecimal != null) {
			if ("022".equals(prdcode)) {
				String tmpResult = bigDecimal.setScale(2, RoundingMode.HALF_UP).toString();
				return tmpResult;
			} else {
				String tmpResult = bigDecimal.setScale(3, RoundingMode.HALF_UP).toString();
				return tmpResult;
			}
		} else {
			return "0.00";
		}
	}
	
	public double getDefaultDoubleValue(BigDecimal bigDecimal){
		if(bigDecimal != null){
			return bigDecimal.doubleValue();
		}else{
			return 0.00;
		}
	}
	
	
	public double getDefaultDoubleValue(String value){
		
		if(!StringUtil.isNullOrEmpty(value)){
			try{
				return Double.parseDouble(value);
			}catch(Exception e){
				return 0.00;
			}
			
		}else{
			return 0.00;
		}
	}
	
	
	/**
	 * 若请求UCWEB的变量为空时候，只能传个空串，不能传递null,否则UCWEB分析不出来查不出数据。所以如下方法用来过滤null
	 */
	public void formatProp() {
		this.uid = filterNull(uid);
		this.productId = filterNull(productId);
		this.beiginTime = filterNull(beiginTime);
		this.endTime = filterNull(endTime);
		this.pangeNo = filterNull(pangeNo);
		this.pageCount = filterNull(pageCount);
		this.dealType = filterNull(dealType);
		this.orderType = filterNull(orderType);
		this.entry = filterNull(entry);
	
	}
	
	public String filterNull(String source) {
		if (source == null || "null".equalsIgnoreCase(source)) {
			return "";
		} else {
			return source;
		}
	}

	protected void init(){
		transCodeMap = new HashMap<String,String>();
		transCodeMap.put("NETPAY", this.getText("report.deposit"));//存款
		transCodeMap.put("MDEPOSIT", this.getText("report.deposit"));//存款
		transCodeMap.put("CANCELDRAW", this.getText("report.deposit"));//存款
		transCodeMap.put("WITHDRAW", this.getText("report.withdrawals"));//取款
		transCodeMap.put("PC", this.getText("report.profit"));//盈亏
		transCodeMap.put("FEE", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_FAULT", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_DEPOSIT", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_WITH", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_CLEAR", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_TRANSFER", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_ST", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_COMMIS", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_WPRICE", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MA_OTHER", this.getText("report.fee"));//手续费
		transCodeMap.put("FEE_MONEYADJUST", this.getText("report.fee"));//手续费
		transCodeMap.put("BET_YJ", this.getText("report.commission"));//佣金
		transCodeMap.put("PC_YJ", this.getText("report.commission"));//佣金
		transCodeMap.put("SYSCLEARZERO", this.getText("report.systemCleared")); //系统清零
		transCodeMap.put("CASH_BACK", this.getText("report.cashback"));//回赠金额
		transCodeMap.put("COUPON_IN", this.getText("report.tokenDiscount"));//代币优惠
		transCodeMap.put("COUPON_OUT",this.getText("report.TokenExpire"));//代币到期;
		transCodeMap.put("AC_DRAW", this.getText("report.autoCancelWithdrawal"));//自動取消取款
		transCodeMap.put("FEE_SYSADJUST", this.getText("report.specialAdjustment"));//特殊金额调整
		transCodeMap.put("PRESENT", this.getText("report.preferential"));//優惠
		transCodeMap.put("TRANS_OUT", this.getText("report.transfer")); //轉賬
		transCodeMap.put("TRANS_IN", this.getText("report.transfer")); //轉賬
		transCodeMap.put("CGSE_FEE", this.getText("report.cgsefee"));//交易编码費
		transCodeMap.put("MISPAID_PAYMENT", this.getText("report.mispayCgseFee"));//補繳交易編碼費
		transCodeMap.put("PC_CB", this.getText("report.grants"));//返佣
		transCodeMap.put("BFN", this.getText("report.rebate"));//贈金
		transCodeMap.put("BFP", this.getText("report.rebate"));//贈金
		transCodeMap.put("BFA", this.getText("report.rebate"));//贈金
		transCodeMap.put("FEE_BFA_MOD", this.getText("report.rebate"));//贈金
		transCodeMap.put("BFD", this.getText("report.rebate"));//贈金
		transCodeMap.put("FEE_BFD_MOD", this.getText("report.rebate"));//贈金
		
		transCodeMap.put("PT", this.getText("report.grantsGuarantee"));//保障优惠
		transCodeMap.put("FEE_PT_MOD", this.getText("report.grantsGuarantee"));//保障优惠
		
		
		
		
		
		paginationCriteria = new PaginationCriteria();
		iPageNo = Integer.parseInt(pangeNo);
		iPageCount = Integer.parseInt(pageCount);
		paginationCriteria.setCountPerPage(iPageCount);
		paginationCriteria.setWhichPage(iPageNo-1);
		
		
		if(!StringUtil.isNullOrEmpty(orderFieldName)){
			if(ascening){
				orderby = OrderBy.asc(orderFieldName);			
			}else{
				orderby = OrderBy.desc(orderFieldName);				
			}
		}
		
		
		
		
		if(null!=beiginTime&&!beiginTime.equals("")){
			beiginTime+=" 00:00:00";
		}else{
			beiginTime ="";
		}
		if(null!=endTime&&!endTime.equals("")){
			endTime+=" 23:59:59";
		}else{
			endTime ="";
		}
	}
	
	public void setUid(String uid) {
		this.uid = uid;
	}

	public void setEntry(String entry) {
		this.entry = entry;
	}

	public void setBeiginTime(String beiginTime) {
		this.beiginTime = beiginTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public void setPangeNo(String pangeNo) {
		this.pangeNo = pangeNo;
	}

	public void setPageCount(String pageCount) {
		this.pageCount = pageCount;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public void setDealType(String dealType) {
		this.dealType = dealType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getUid() {
		return uid;
	}

	public String getEntry() {
		return entry;
	}

	public String getBeiginTime() {
		return beiginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public String getPangeNo() {
		return pangeNo;
	}

	public String getPageCount() {
		return pageCount;
	}

	public String getOrderType() {
		return orderType;
	}

	public String getDealType() {
		return dealType;
	}

	public String getReportType() {
		return reportType;
	}

	public String getProductId() {
		return productId;
	}
	
	public void setProductId(String productId) {
		this.productId = productId;
	}


	public String getCusTranCode() {
		return cusTranCode;
	}


	public void setCusTranCode(String cusTranCode) {
		this.cusTranCode = cusTranCode;
	}

	public String getRebateType() {
		return rebateType;
	}

	public void setRebateType(String rebateType) {
		this.rebateType = rebateType;
	}

	public String getOrderFieldName() {
		return orderFieldName;
	}

	public void setOrderFieldName(String orderFieldName) {
		this.orderFieldName = orderFieldName;
	}

	public boolean isAscening() {
		return ascening;
	}

	public void setAscening(boolean ascening) {
		this.ascening = ascening;
	}

	public OrderBy getOrderby() {
		return orderby;
	}

	public void setOrderby(OrderBy orderby) {
		this.orderby = orderby;
	}

	public PaginationCriteria getPaginationCriteria() {
		return paginationCriteria;
	}

	public void setPaginationCriteria(PaginationCriteria paginationCriteria) {
		this.paginationCriteria = paginationCriteria;
	}

	public int getXlsRowNumber() {
		return xlsRowNumber;
	}

	public void setXlsRowNumber(int xlsRowNumber) {
		this.xlsRowNumber = xlsRowNumber;
	}

	public String getFilename() {
		return filename;
	}

	public void setFilename(String filename) {
		this.filename = filename;
	}

	public InputStream getInputStream() {
		return inputStream;
	}

	public void setInputStream(InputStream inputStream) {
		this.inputStream = inputStream;
	}

}
