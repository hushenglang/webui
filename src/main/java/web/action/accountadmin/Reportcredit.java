package web.action.accountadmin;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import web.bean.Credit;
import web.bean.CreditResult;
import web.bean.SumItem;
import web.bean.Suminfo;
import web.util.PaginationCriteria;

@SuppressWarnings("serial")

public class Reportcredit  extends BaseAction {
	private PaginationCriteria	paginationCriteria	= (new PaginationCriteria()).setCountPerPageEx(10).setWhichPageEx(0);
	private List<Credit> item=new ArrayList<Credit>();
	private Suminfo sumInfo=new Suminfo();
	private SumItem sumItem=new SumItem();
	private int totalPages;
	private String type;
	
	@Override
	protected String perform() {
		try {
			String loginname = getPrincipal().getLoginName();
			CreditResult cr = manager.getCreditReport(loginname, paginationCriteria,type, "1","","");
			if(cr!=null){
				
				paginationCriteria.setRowCount(Integer.parseInt(cr.getTotalCount()));
				totalPages=paginationCriteria.getPageCount();
				item=cr.getDealList();
				sumInfo=cr.getSuminfo();
				sumItem=sumInfo.getSumItem();
			}
		} catch (Exception e) {
			logger.error("", e);			
		}
		return SUCCESS;
	}
	
	public String getBeginDate() {
		Calendar begin = new GregorianCalendar();
		begin.set(Calendar.HOUR_OF_DAY, 0);
		begin.set(Calendar.MINUTE, 0);
		begin.set(Calendar.SECOND, 0);
		Date beginDate = begin.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(beginDate);
	}

	public String getEndDate() {
		Calendar end = new GregorianCalendar();
		end.set(Calendar.HOUR_OF_DAY, 23);
		end.set(Calendar.MINUTE, 59);
		end.set(Calendar.SECOND, 59);
		Date endDate = end.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(endDate);
	}

	public PaginationCriteria getPaginationCriteria() {
		return paginationCriteria;
	}

	public void setPaginationCriteria(PaginationCriteria paginationCriteria) {
		this.paginationCriteria = paginationCriteria;
	}

	public List<Credit> getItem() {
		return item;
	}

	public void setItem(List<Credit> item) {
		this.item = item;
	}

	public Suminfo getSumInfo() {
		return sumInfo;
	}

	public void setSumInfo(Suminfo sumInfo) {
		this.sumInfo = sumInfo;
	}



	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public SumItem getSumItem() {
		return sumItem;
	}

	public void setSumItem(SumItem sumItem) {
		this.sumItem = sumItem;
	}

	
	
	
	
	
}
