package web.action.accountadmin;

import web.util.WebUiUtils;

import com.gwghk.demo.gold.client.DemoClientManagerFactory;
import com.gwghk.demo.gold.client.models.DemoApiResult;
import com.gwghk.demo.gold.client.models.PaginationCriteria;
import com.gwghk.demo.persistence.detached.dialet.OrderBy;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.gold.client.models.StringUtil;

public class ReportServiceDemo implements ReportService {

	private static ReportService rs = null;
	public static ReportService getReportService(){
		if(rs == null)
		{
			rs = new ReportServiceDemo();
		}
		return rs;		
	}
	
	private static OrderBy formOrderBy(boolean ascending, String orderByFieldName)
	{
		OrderBy orderby = null;
		if(!StringUtil.isNullOrEmpty(orderByFieldName)){
			if(ascending){
				orderby = OrderBy.asc(orderByFieldName);
			}else{
				orderby = OrderBy.desc(orderByFieldName);
			}
		}
		return orderby;
	}
	
	private static PaginationCriteria formOrderBy(int pageSize, int pageNumber)
	{
		PaginationCriteria paginationCriteria = new PaginationCriteria();
		paginationCriteria.setCountPerPage(new Integer(pageSize));
		paginationCriteria.setWhichPage(new Integer(pageNumber-1));
		return paginationCriteria;
	}
	
	@Override
	public ApiResult getConsignReport(String loginname, String openOrClose,
			String searchOrderId, String productId, String searchBeingTime,
			String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		
		DemoApiResult demoApiResult = DemoClientManagerFactory.getInstance().getWebUiManager().getConsignReport(loginname, openOrClose, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
		return WebUiUtils.convertApiResult(demoApiResult);
	}

	@Override
	public ApiResult getTradeReport(String loginname, String openOrClose,
			String searchOrderId, String productId, String searchBeingTime,
			String searchEndTime,boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		DemoApiResult demoApiResult = DemoClientManagerFactory.getInstance().getWebUiManager().getTradeReport(loginname, openOrClose, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
		return WebUiUtils.convertApiResult(demoApiResult);
	}

	@Override
	public ApiResult getProfitReport(String loginname, String searchOrderId,
			String productId, String searchBeingTime, String searchEndTime,
			boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize,
			boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		DemoApiResult demoApiResult = DemoClientManagerFactory.getInstance().getWebUiManager().getProfitReport(loginname, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
		return WebUiUtils.convertApiResult(demoApiResult);
	}

	@Override
	public ApiResult getBalanceReport(String loginname, String cusTranCode,
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		
		DemoApiResult demoApiResult = DemoClientManagerFactory.getInstance().getWebUiManager().getBalanceReport(loginname, cusTranCode, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
		return WebUiUtils.convertApiResult(demoApiResult);
	}

	@Override
	public ApiResult getCashBackReport(String loginname, String cashBackType,
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		
		DemoApiResult demoApiResult = DemoClientManagerFactory.getInstance().getWebUiManager().getCashBackReport(loginname, cashBackType, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
		return WebUiUtils.convertApiResult(demoApiResult);
	}

}
