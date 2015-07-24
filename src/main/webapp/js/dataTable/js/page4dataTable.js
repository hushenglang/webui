/**
 * DataTable分页插件
 * 用法：
 * 		$(document).ready(function() {
 * 			$('#example').dataTable( {
 * 			"sPaginationType": "input"
 * 			} );
 * 		} );
 * 
 */
$(function() {
$.fn.dataTableExt.oPagination.input = {
		    "fnInit": function ( oSettings, nPaging, fnCallbackDraw )
		    {
		        var nFirst = document.createElement( 'span' );
		        var nPrevious = document.createElement( 'span' );
		        var nNext = document.createElement( 'span' );
		        var nLast = document.createElement( 'span' );
		        var nInput = document.createElement( 'input' );
		        var nPage = document.createElement( 'span' );
		        var nOf = document.createElement( 'span' );
		        
		        // //首页、上一页、下一页、尾页
		        nFirst.innerHTML = '首页';
		        nPrevious.innerHTML = '上一页';
		        nNext.innerHTML = '下一页';
		        nLast.innerHTML = '尾页';
		         
		        //首页、上一页、下一页、尾页
		        nFirst.className = "paginate_button first";
		        nPrevious.className = "paginate_button previous";
		        nNext.className="paginate_button next";
		        nLast.className = "paginate_button last";
		        nOf.className = "paginate_of";
		        nPage.className = "paginate_page";
		          
		        if ( oSettings.sTableId !== '' )
		        {
		            nPaging.setAttribute( 'id', oSettings.sTableId+'_paginate' );
		            nFirst.setAttribute( 'id', oSettings.sTableId+'_first' );
		            nPrevious.setAttribute( 'id', oSettings.sTableId+'_previous' );
		            nNext.setAttribute( 'id', oSettings.sTableId+'_next' );
		            nLast.setAttribute( 'id', oSettings.sTableId+'_last' );
		        }
		          
		        nInput.type = "text";
		        nInput.style.width = "30px";
		        nInput.style.display = "inline";
		        nPage.innerHTML = "&nbsp;&nbsp;转至 ";
		          
		        nPaging.appendChild( nFirst );
		        nPaging.appendChild( nPrevious );
		        nPaging.appendChild( nNext );
		        nPaging.appendChild( nLast );
		        
		        nPaging.appendChild( nPage );
		        nPaging.appendChild( nInput );
		        nPaging.appendChild( nOf );
		          
		        $(nFirst).click( function () {
		            oSettings.oApi._fnPageChange( oSettings, "first" );
		            fnCallbackDraw( oSettings );
		        } );
		          
		        $(nPrevious).click( function() {
		            oSettings.oApi._fnPageChange( oSettings, "previous" );
		            fnCallbackDraw( oSettings );
		        } );
		          
		        $(nNext).click( function() {
		            oSettings.oApi._fnPageChange( oSettings, "next" );
		            fnCallbackDraw( oSettings );
		        } );
		          
		        $(nLast).click( function() {
		            oSettings.oApi._fnPageChange( oSettings, "last" );
		            fnCallbackDraw( oSettings );
		        } );
		          
		        $(nInput).keyup( function (e) {
		              
		            if ( e.which == 38 || e.which == 39 )
		            {
		                this.value++;
		            }
		            else if ( (e.which == 37 || e.which == 40) && this.value > 1 )
		            {
		                this.value--;
		            }
		              
		            if ( this.value == "" || this.value.match(/[^0-9]/) )
		            {
		                /* Nothing entered or non-numeric character */
		                return;
		            }
		              
		            var iNewStart = oSettings._iDisplayLength * (this.value - 1);
		            if ( iNewStart > oSettings.fnRecordsDisplay() )
		            {
		                /* Display overrun */
		                oSettings._iDisplayStart = (Math.ceil((oSettings.fnRecordsDisplay()-1) /
		                    oSettings._iDisplayLength)-1) * oSettings._iDisplayLength;
		                fnCallbackDraw( oSettings );
		                return;
		            }
		              
		            oSettings._iDisplayStart = iNewStart;
		            fnCallbackDraw( oSettings );
		        } );
		          
		        /* Take the brutal approach to cancelling text selection */
		        $('span', nPaging).bind( 'mousedown', function () { return false; } );
		        $('span', nPaging).bind( 'selectstart', function () { return false; } );
		    },
		     
		     
		    "fnUpdate": function ( oSettings, fnCallbackDraw )
		    {
		        if ( !oSettings.aanFeatures.p )
		        {
		            return;
		        }
		        var iPages = Math.ceil((oSettings.fnRecordsDisplay()) / oSettings._iDisplayLength);
		        var iCurrentPage = Math.ceil(oSettings._iDisplayStart / oSettings._iDisplayLength) + 1;
		          
		        /* Loop over each instance of the pager */
		        var an = oSettings.aanFeatures.p;
		        for ( var i=0, iLen=an.length ; i<iLen ; i++ )
		        {
		            var spans = an[i].getElementsByTagName('span');
		            var inputs = an[i].getElementsByTagName('input');
		            spans[5].innerHTML = " 共 "+iPages + " 页";
		            //spans[5].innerHTML = "  ";
		            inputs[0].value = iCurrentPage;
		        }
		    }
		};
});