package web.action.accountadmin;

import com.gwghk.gold.client.models.PaginationCriteria;
import com.gwghk.gold.client.models.StringUtil;
import com.gwghk.gold.client.ClientManagerFactory;
import com.gwghk.gold.client.models.ApiResult;
import com.gwghk.persistence.detached.dialet.OrderBy;

public class ReportServiceReal implements ReportService{

	private final static boolean isDemo = false;
	private static ReportService rs = null;
	public static ReportService getReportService(){
		if(rs == null)
		{
			rs = new ReportServiceReal();
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
		
		return ClientManagerFactory.getInstance().getWebUiManager().getConsignReport(isDemo, loginname, openOrClose, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
	}

	@Override
	public ApiResult getTradeReport(String loginname, String openOrClose,
			String searchOrderId, String productId, String searchBeingTime,
			String searchEndTime,boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		return ClientManagerFactory.getInstance().getWebUiManager().getTradeReport(isDemo, loginname, openOrClose, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
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
		
		return ClientManagerFactory.getInstance().getWebUiManager().getProfitReport(isDemo, loginname, searchOrderId, productId, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
	}

	@Override
	public ApiResult getBalanceReport(String loginname, String cusTranCode,
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		
		return ClientManagerFactory.getInstance().getWebUiManager().getBalanceReport(isDemo, loginname, cusTranCode, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
	}

	@Override
	public ApiResult getCashBackReport(String loginname, String cashBackType,
			String searchBeingTime, String searchEndTime, boolean ascending, String orderByFieldName,
			int pageNumber, int pageSize, boolean forDownload) {
		// TODO Auto-generated method stub
		OrderBy orderby = formOrderBy(ascending, orderByFieldName);		
		PaginationCriteria paginationCriteria = formOrderBy(pageSize, pageNumber);
		
		return ClientManagerFactory.getInstance().getWebUiManager().getCashBackReport(isDemo, loginname, cashBackType, searchBeingTime, searchEndTime, orderby, paginationCriteria, forDownload);
	}

	
	
}
