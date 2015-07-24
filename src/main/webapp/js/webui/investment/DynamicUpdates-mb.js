$(function(){

	// 轉換  function
	var dynUpdate2Array = new Object2Array({
		"time": function(data){return Util.getSimpleTime(data, "yyyy-MM-dd hh:mm:ss");}, 
		"status": function(data){return data;},
		"message": function(data){return data;}
	});
	
	DynamicUpdates.onAdd = function(record){
		$('#lastDynamicUpdate').html(Util.getSimpleTime(
				record.time, "yyyy-MM-dd hh:mm:ss") + '&nbsp;&nbsp;' + record.status + '&nbsp;&nbsp;' +  record.message);
		var $dynamicUpdatesTable = $('#dynamicUpdatesTable').dataTable();
		$dynamicUpdatesTable.fnClearTable();
		$dynamicUpdatesTable.fnAddData(dynUpdate2Array.toArrays(DynamicUpdates.records));
	};
	
	
	DynamicUpdates.onClear = function(){
		var $dynamicUpdatesTable = $('#dynamicUpdatesTable').dataTable();
		$dynamicUpdatesTable.fnClearTable();
	};

	$('#dynamicUpdates').html('<table id="dynamicUpdatesTable"  cellpadding="0" cellspacing="0" class="liebiao-tabox weituo-tabox"></table>');
	
	// init
	$('#dynamicUpdatesTable').dataTable( {
		"aaData": [],
		"aoColumns": [
			{ "sTitle": i18n.dynamic.time},
			{ "sTitle": i18n.dynamic.status},
			{ "sTitle": i18n.dynamic.info},
		],
		"sScrollY": "198px",
		"sScrollX": "100%",
		"bScrollCollapse": false,
		"bPaginate": false,
		"bFilter": false,
		"bInfo": false,
		"bAutoWidth": false,
		"bSort": false,
        "asStripeClasses": ['','tr-bg'],
        "oLanguage": {
            "sEmptyTable": " "
         }
	} );
	
	$('#dynamicUpdates th').unbind( "click" );
	
});