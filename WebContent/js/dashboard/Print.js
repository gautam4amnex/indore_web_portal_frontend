/**
 * 
 */
(function(global, $) {
	
	'use strict'
	
	if (!global) {
		throw "window object is not defined";
	}

	if (!$) {
		throw "jQuery is not defined";
	}
	
	
	var print = {
		
			// Below method is used to export the map in the form of image or Pdf and contains the logic of that.
			printMap : function(exportObject, map,pagetype="main",canvas){
				
				let container = document.getElementById(exportObject.id);
				let extension = exportObject.exportType;
				let fileName = exportObject.fileName;
				let tooltipText = exportObject.tooltipText;
				let orientation = exportObject.orientation;
				let logoPath;
				let arrowPath;
				
				if(extension == "pdf"){
					
					if(exportObject.includeLegend){
						//let layerMap  = window.modules.mapController.listGrouping(window.modules.layers, "parentLayer");
						//window.modules.printModule.getLegendTable(layerMap, "legendTableDiv",pagetype);
						
					}
					
					// This if else block use for the diffrentiate path for the analytical dashboards
					if(pagetype=="main"){
						logoPath='https://apagri.infinium.management/temp/logo-bg.png'; 
						arrowPath= 'https://apagri.infinium.management/temp/logo-bg.png'; 
					}
					else{
						logoPath="https://apagri.infinium.management/temp/logo-bg.png";
						arrowPath='https://apagri.infinium.management/temp/logo-bg.png';
					}
					
					var doc = new jsPDF(exportObject.orientation, "mm", exportObject.pageSetup);
					html2canvas($(".printWholeMap"), {
						onrendered: function(canvas) {
							let scaleBy = 5;
							let context = canvas.getContext('2d');
						    context.scale(scaleBy, scaleBy);
						    window.printModule.getBase64ImageByXHR(logoPath, function(imagedata){
						    	doc.setTextColor(40);
						    	//doc.setFontStyle('normal');
								doc.addImage(imagedata, 'png', 15, 5, 20, 20);
								doc.setFontSize(12);
								doc.myText("Indore Smart City Development Corporation Limited", {align: "center"},0,10);
								doc.myText(exportObject.title,  {align: "center"},0, 17);
								doc.setFontStyle('normal');
								window.printModule.getBase64ImageByXHR(arrowPath, function(northArrowData){
								//doc.addImage(northArrowData, 'png', doc.internal.pageSize.width - 30, 5, 15, 15);
									
									try{
										let pageHeight = doc.internal.pageSize.height;      
										let imgWidth = doc.internal.pageSize.width - 20;
										let imgHeight;
										let position = 40;
										if(exportObject.orientation == "l"){
											imgHeight = doc.internal.pageSize.height / 1.5;
											if(exportObject.pageSetup == "a5"){
												position = 30;
											}
										} else if(exportObject.orientation == "p"){
											if(exportObject.pageSetup == "a1"){
												imgHeight = doc.internal.pageSize.height / 3;
											} else {
												imgHeight = doc.internal.pageSize.height / 3;	
											}
										}
										
										doc.setFontSize(14);
										let imgData = new Image();
										imgData.setAttribute('crossOrigin', 'Anonymous');
										imgData.src = canvas.toDataURL('image/png');
										doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
										doc.setFontSize(8);
										
										//doc.myText("Powered by :- Amnex", {align: "left"}, 0, pageHeight - 45); 
										if(exportObject.orientation == "l"){
											doc.addPage();
											doc.setFontSize(8);
											doc.setTextColor(40);
			    							//doc.myText("Scale :- " + window.modules.mapController.getScaleLine().renderedHTML_, {align: "right"}, doc.internal.pageSize.width - 30,  15);
			    							//doc.myText("Date & Time :- " +exportObject.dateTime, doc.internal.pageSize.width - 40,  15);
											let wrappedText = doc.splitTextToSize("Disclaimer  :- The content available on the website is provided by various government agencies. This portal is maintained by Indore Smart City Development Corporation Limited. While accessing this website, you unconditionally accept to be legally bound by the terms and conditions. If you do not agree to the mentioned terms and conditions, please do not access the content on this web portal.", doc.internal.pageSize.width - 10);
											doc.text(wrappedText, 5, 20);
										} else {
											//doc.myText("Scale :- " + window.modules.mapController.getScaleLine().renderedHTML_, {align: "right"}, 0,  pageHeight - 45);
											//doc.myText("Date & Time :- " +exportObject.dateTime, {align: "right"}, 0,  pageHeight - 50);
											let wrappedText = doc.splitTextToSize("Disclaimer  :- The content available on the website is provided by various government agencies. This portal is maintained by Indore Smart City Development Corporation Limited. While accessing this website, you unconditionally accept to be legally bound by the terms and conditions. If you do not agree to the mentioned terms and conditions, please do not access the content on this web portal.", doc.internal.pageSize.width - 10);
											doc.text(wrappedText, 5, doc.internal.pageSize.height - 40);
										}
										
									} catch(e2){
										console.error(e2);
									}
									
									try{ 
			    						
										if(exportObject.includeLegend){

			    							doc.addPage();
			    							doc.setFontSize(20);
			    							doc.myText("Legends ", {align: "left"}, 0, 15);
			    							doc.setFontSize(8);
			    							doc.text(156, doc.internal.pageSize.height - 40,"Date & Time :- " +exportObject.dateTime);
											//doc.text( 183, doc.internal.pageSize.height - 35, "Scale :- " + window.modules.mapController.getScaleLine().renderedHTML_);
			    							let wrappedText = doc.splitTextToSize("Disclaimer  :- The content available on the website is provided by various government agencies. This portal is maintained by Indore Smart City Development Corporation Limited. While accessing this website, you unconditionally accept to be legally bound by the terms and conditions. If you do not agree to the mentioned terms and conditions, please do not access the content on this web portal.", doc.internal.pageSize.width - 10);
											doc.text( 5, doc.internal.pageSize.height - 30, wrappedText);
											
											
			    							doc.autoTable({
			    								html: '.table-legend',
			    						        tableWidth: 'auto',
			    						        styles: {cellPadding: 3, fontSize: 12, minCellHeight : 10, halign : 'left', valign : 'middle', lineWidth : 0.5, lineColor : 10},
			    						        pageBreak : 'auto',
			    						        showHead : 'everyPage',
			    						        showFoot: 'everyPage',
			    						        startY : 25,
			    						        rowPageBreak: 'auto',
			    						        font: 'helvetica',
			    						        fontStyle: 'normal',
			    						        didDrawCell: data => {
			    						        	if (data.section === 'body' && parseInt(data.column.index) === 1) {
			    						        		try{
			    						        			let cnvs = $u.getBase64Image($(data.cell.raw.innerHTML).get(0));
			    						        			doc.addImage(cnvs, 'png', data.cell.x + 2, data.cell.y + 2, 5, 5);
			    						        		} catch(error){
			    						        			console.error(error);
			    						        		}
			    						            }
			    						        },
			    						        cellWidth: 'auto', 
			    						        didDrawPage : function(data){
			    						        	let totalPages = doc.internal.getNumberOfPages();
				    	    						for (let i = 1; i <= totalPages; i++) {
				    	    							doc.setPage(i);
				    	    							doc.setTextColor(150);
				    	    							doc.setFontSize(10);
						    						
				    	    							doc.text(5, doc.internal.pageSize.height - 7, window.modules.contents['rajkot_city_gis']);
				    	    							doc.text(doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 7, i.toString());
				    	    							doc.setTextColor(150);
				    	    							doc.setFontSize(8);
				    	    							doc.text((doc.internal.pageSize.width / 2) - 30, doc.internal.pageSize.height - 7, "Copyright 2022 Indore Smart City Portal");
				    	    						}
				    	    						$(".se-pre-con").fadeOut("slow");
				    	    						
				    	    					
				    	                            doc.save(fileName + '.pdf');
			    						        }
			    						    });
			    							
			    						} else {
			    							var totalPages = doc.internal.getNumberOfPages();
			        						for (let i = 1; i <= totalPages; i++) {
			        							doc.setPage(i);
			        							doc.setTextColor(150);
			        							doc.setFontSize(10);
			        							doc.text(5, doc.internal.pageSize.height - 7, "Indore Smart City GIS");
			        							doc.text(doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 7, i.toString());
			        							doc.setTextColor(150);
			        							doc.setFontSize(8);
			        							doc.text((doc.internal.pageSize.width / 2)-30, doc.internal.pageSize.height - 7, "Copyright 2022 Indore Smart City Portal");
			        						}
			                                doc.save(fileName + '.pdf');
			                                
			                            
			                                
			    						}
		    					    } catch (e) {
		    							console.error(e);
		    						}
									
								});
								
							});
							
						}
					}).catch((e)=>{
	                	console.error(e);
	                });
					
				} else if(extension == "jpeg" || extension == "png"){
					
					html2canvas($(".printWholeMap"), {
						
	                    onrendered : function(canvas) {
	                    	try{
	                    		map.once('precompose', function(event) {
	    							var scaleFactor = 300 / 96;
	    							exportObject.canvas.width = Math.ceil(exportObject.canvas.width * scaleFactor);
	    							exportObject.canvas.height = Math.ceil(exportObject.canvas.height * scaleFactor);
	    							var ctx=canvas.getContext("2d"); // img of new html2canvas
	    							ctx.scale(scaleFactor, scaleFactor);
	    						});
	    						
	    						map.once('postcompose', function(event) {
	    							let img = canvas.toDataURL("image/jpeg");  // img of new html2canvas
	    							var aTag = document.createElement('a');
	    							aTag.href = img;
	    							aTag.download= fileName+'.' +extension;
	    							document.getElementById("form_print").appendChild(aTag);
	    							aTag.click();
	    						});
	    						map.renderSync();
	                    	} catch(e){
	                    		console.error(e);
	                    	}
	                    }
	                })
					

				} 
				
			}, 
			
			// Below function used for the adding legends to the pdf
			getLegendTable : function(layers, id,pagetype="main"){
				
				$(".table-legend tbody").html("");
				if(layers){
					for(let k in layers){
						let subLayers = layers[k];
						for(let i in subLayers){
							let subLayer = subLayers[i];
							let img;
							// This if block use beacause we need to show legends icons in analytical dashboard
							if(pagetype=="main"){
								 img = window.modules.legendIcon[subLayer.tableName]
							}else{
								 img = "../"+window.modules.legendIcon[subLayer.tableName]
							}
							
							if(subLayer.visible && img && img != null && img != ""){
								window.printModule.getBase64ImageByXHR(img, function(base64){
									$(".table-legend tbody").append("<tr><td>" + subLayers[i].layerName + "</td><td style='width:105px;height:77px;'><img src='" + base64 + "' alt=''/></td></tr>");
								});
							}						
						}
					}
				}
			},
			
			getBase64Image : function (img) {
				let canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				let ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				return canvas.toDataURL("image/png");
			},

			getBase64ImageByXHR : function (url, callback) {
				var xhr = new XMLHttpRequest();
				xhr.onload = function () {
					var reader = new FileReader();
					reader.onloadend = function () {
						callback(reader.result);
					}
					reader.readAsDataURL(xhr.response);
				};
				xhr.open('GET', url);
				xhr.responseType = 'blob';
				xhr.send();
			}
			
	}

	global.printModule = print;

})(window, jQuery);