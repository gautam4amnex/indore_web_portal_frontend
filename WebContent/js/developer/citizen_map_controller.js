(function(global, $) {
	"use stricts;"

	var map;

	var base = {
		setMap : function(map) {
			return this.map = map;
		},
		getMap : function() {
			return this.map;
		},
		drawPreviewEvents : function() {
			// Line preview
			$("#line_width").change(
					function() {
						window.cityMapController.changePreview("lineSvg",
								"stroke-width", $(this).val());
					});

			$("#line_color").change(
					function() {
						window.cityMapController.changePreview("lineSvg",
								"stroke", $(this).val());
					});

			// Multi line
			$("#multi_line_width").change(
					function() {
						window.cityMapController.changePreview("polyLineSvg",
								"stroke-width", $(this).val());
					});

			$("#multi_line_color").change(
					function() {
						window.cityMapController.changePreview("polyLineSvg",
								"stroke", $(this).val());
					});

			// Triangle
			$("#t_s_color").change(
					function() {
						window.cityMapController.changePreview("triangleSvg",
								"stroke", $(this).val());
					});

			$("#t_b_width").change(
					function() {
						window.cityMapController.changePreview("triangleSvg",
								"stroke-width", $(this).val());
					});

			$("#t_f_color").change(
					function() {
						window.cityMapController.changePreview("triangleSvg",
								"fill", $(this).val());
					});

			// Rectangle
			$("#s_s_color").change(
					function() {
						window.cityMapController.changePreview("recatangleSvg",
								"stroke", $(this).val());
					});

			$("#s_b_width").change(
					function() {
						window.cityMapController.changePreview("recatangleSvg",
								"stroke-width", $(this).val());
					});

			$("#s_f_color").change(
					function() {
						window.cityMapController.changePreview("recatangleSvg",
								"fill", $(this).val());
					});

			// Circle
			$("#c_s_color").change(
					function() {
						window.cityMapController.changePreview("circleSvg",
								"stroke", $(this).val());
					});

			$("#c_b_width").change(
					function() {
						window.cityMapController.changePreview("circleSvg",
								"stroke-width", $(this).val());
					});

			$("#c_f_color").change(
					function() {
						window.cityMapController.changePreview("circleSvg",
								"fill", $(this).val());
					});

			// polygon

			$("#p_s_color").change(
					function() {
						window.cityMapController.changePreview("polygonSvg",
								"stroke", $(this).val());
					});

			$("#p_b_width").change(
					function() {
						window.cityMapController.changePreview("polygonSvg",
								"stroke-width", $(this).val());
					});

			$("#p_f_color").change(
					function() {
						window.cityMapController.changePreview("polygonSvg",
								"fill", $(this).val());
					});

			// Text
			$('#tool_text').keyup(function() {
				let preview_txt = $("#lblDrawTxt").text("");
				$("#lblDrawTxt").text($(this).val());
			});

			$("#tool_fontcolor").change(function() {
				$('#lblDrawTxt').css('color', $(this).val());
				$('#lblDrawTxt').css('font-size', $(this).val());
			});

			$("#tool_fontsize").change(function() {
				let f_size = $(this).val();
				$('#lblDrawTxt').css('font-size', $(this).val() + "px");
			});
		},
		changePreview : function(svgId, key, value) {
			$('#' + svgId).attr(key, value);
		},
		fileChangeEvent : function() {
			$('#event_file').change(
					function() {
						window.cityMapController.removeImageError('event_file',
								'event_file-error');
					});

			$('#fs_upfile').change(
					function() {
						window.cityMapController.removeImageError('fs_upfile',
								'fs_upfile-error');
					});

			$('#ad_simage').change(
					function() {
						window.cityMapController.removeImageError('ad_simage',
								'ad_simage-error');
					});
		},
		removeImageError : function(ipId, lblId) {
			if ($('#' + ipId).val() != "") {
				$('#' + ipId).removeClass('error');
				$('#' + lblId).remove();
				return;
			}
		},
		dropDownChangeEvent : function() {
			// ward chnage event
			$('#ward_select').change(function() {
				let ward_id = $(this).val();

				$('#lbl_health_ofc').text("");
				$('#lbl_health_ofc_no').text("");
				//$('#lbl_inspector').text("");
				$('#lbl_zonal_ofc').text("");
				$('#lbl_zonal_ofc_no').text("");
				$('#lbl_sanitary_ofc').text("");
				$('#lbl_sanitary_ofc_no').text("");

				$('#lbl_population').text("");
				$('#lbl_gender').text("");
				$('#lbl_gender_ratio').text("");

				$('#lbl_corpo_contact').text("");
				$('#lbl_corpo_name').text("");

				$('#lbl_prisch_name').text("");
				$('#lbl_secsch_name').text("");
				$('#lbl_clg_name').text("");
//				$('#lbl_institute_name').text("");
//				$('#lbl_sch_name').text("");

				$('#lbl_hotel_name').text("");
				$('#lbl_rest_name').text("");

				$('#lbl_clinic_name').text("");
				$('#lbl_dispensary_name').text("");
				$('#lbl_hospital_name').text("");
				$('#lbl_pharmacy_name').text("");

				$('#lbl_ward_name').text("");
				$('#lbl_ward_no').text("");
				$('#lbl_ward_area').text("");

				$('#lbl_zone_name').text("");
				$('#lbl_zone_no').text("");
				/**
       			 * ward_highlight_query 
       			 */
       			
       			//window.base.highlightWard(ward_id);
				window.base.zoomToWard(ward_id);
				window.wardInfoController.getWardInfo(ward_id);
			});

			// event duration change event
			/*$('#select_eventduration').change(
					function() {
						$("#event_query_rslt div").remove(".event-list");
						let duration_id = $(this).val();

						if (duration_id != null && duration_id != ""
								&& duration_id != undefined) {
							window.eventController.getEventList(duration_id,
									_status_name);
						}
					});*/
		},
	}
	/**
	 * add public functions to base
	 */

	global.cityMapController = base;

})(window, jQuery)