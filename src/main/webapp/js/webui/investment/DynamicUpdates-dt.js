$(function(){

	// 轉換  function
	var dynUpdate2Array = new Object2Array({
		"time": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");}, 
		"status": function(data){return data;},
		"message": function(data){return data;}
	});
	
	DynamicUpdates.onAdd = function(record){
		var $dynamicUpdatesTable = $('#dynamicUpdatesTable').dataTable();
		$dynamicUpdatesTable.fnClearTable();
		var dynamicArray = dynUpdate2Array.toArrays(DynamicUpdates.records);
		$dynamicUpdatesTable.fnAddData(dynamicArray);
		$(".dynamicinfo_data_info").html(Util.getSimpleTime(
				record.time, "yyyy-MM-dd hh:mm:ss") + '&nbsp;&nbsp;' + record.status + '&nbsp;&nbsp;' +  record.message);
	};
	
	
	DynamicUpdates.onClear = function(){
		var $dynamicUpdatesTable = $('#dynamicUpdatesTable').dataTable();
		$dynamicUpdatesTable.fnClearTable();
	};

	
	// init
	$('#dynamicUpdatesTable').dataTable( {
		"aaData": [],
		"aoColumns": [
			{ "sTitle": i18n.dynamic.time, "bSortable": false, "sWidth":"250"},
			{ "sTitle": i18n.dynamic.status, "bSortable": false, "sWidth":"240"},
			{ "sTitle": i18n.dynamic.info, "bSortable": false, "sWidth":"560"},
		],
		"sScrollY": "120px",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"bSort": false,
	    "asStripeClasses": ['','tr-bg'],
	    "oLanguage": {
	        "sEmptyTable": " "
	     },
        "columnDefs": [
						{
						    "defaultContent": "",
						    "targets": -1
						  }
                      ],
	} );
	
	$('#dynamicUpdates th').unbind( "click" );
	$.fn.dataTableExt.sErrMode = 'throw'; //此处是消除datatabls的warning提示.
});