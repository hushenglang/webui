package web.action.accountadmin;

import com.gwghk.demo.gold.client.models.PaginationCriteria;
import com.gwghk.gold.client.models.ApiResult;

public interface ReportService {

	/**
	 * 委托记录
	 * @param loginname
	 * @param openOrClose : 1开仓, 0平仓
	 * @param searchOrderId : orderid like '%?' "+ " or borderid like '%?'
	 * @param productId : 0伦敦金, 1伦敦银
	 * @param searchBeingTime
	 * @param searchEndTime
	 * @param orderBy: 排序的columnn名
	 * @param paginationCriteria
	 * @return
	 */
	public ApiResult getConsignReport(String loginname,
			String openOrClose, String searchOrderId, 
			String productId, 
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload);
	
	
	/**
	 * 成交记录
	 * @param loginname
	 * @param openOrClose : 1开仓, 0平仓
	 * @param searchOrderId : orderid like '%?' "+ " or borderid like '%?'
	 * @param productId : 0伦敦金, 1伦敦银
	 * @param searchBeingTime
	 * @param searchEndTime
	 * @param orderBy: 排序的columnn名
	 * @param paginationCriteria
	 * @return
	 */
	public ApiResult getTradeReport(String loginname,
			String openOrClose, String searchOrderId,  String productId, 
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload);
	
	/**
	 * 盈亏记录
	 * @param loginname
	 * @param openOrClose : 1开仓, 0平仓
	 * @param searchOrderId : orderid like '%?' "+ " or borderid like '%?'
	 * @param productId : 0伦敦金, 1伦敦银
	 * @param searchBeingTime
	 * @param searchEndTime
	 * @param orderBy: 排序的columnn名
	 * @param paginationCriteria
	 * @return
	 */
	public ApiResult getProfitReport(String loginname,
			String searchOrderId,  String productId, 
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload);

	
	/**
	 * 额度记录
	 * @param loginname
	 * @param cusTranCode : Code in FCUS_TRAN
	 * @param searchBeingTime
	 * @param searchEndTime
	 * @param orderBy: 排序的columnn名
	 * @param paginationCriteria
	 * @return
	 */
	public ApiResult getBalanceReport(String loginname,String cusTranCode, 
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload);
	
	/**
	 * 优惠记录
	 * @param loginname
	 * @param cashBackType : 1:回贈, 2:代幣
	 * @param searchBeingTime
	 * @param searchEndTime
	 * @param orderBy: 排序的columnn名
	 * @param paginationCriteria
	 * @return
	 */
	public ApiResult getCashBackReport(String loginname,String cashBackType, 
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload);
	
	
}
