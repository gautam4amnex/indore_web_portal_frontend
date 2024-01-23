(function(global, $) {
	"use stricts;"

	var baseUrl = '';
	
	var appConfig = {
			mapView : null,
			sceneView : null,
			activeView : null,
			container : "map"
		};


	var base = {

			drawPolyline: function drawPolyline(view){
				
				appConfig.mapView = view;
				
				 const draw = new Draw({
			            view: appConfig.mapView
			     });
				
				appConfig.mapView.graphics.removeAll();

	            // creates and returns an instance of PolyLineDrawAction
	            const action = draw.create("polyline");

	            // focus the view to activate keyboard shortcuts for sketching
	            appConfig.mapView.focus();

	            // listen polylineDrawAction events to give immediate visual feedback
	            // to users as the line is being drawn on the view.
	            action.on(
	              [
	                "vertex-add",
	                "vertex-remove",
	                "cursor-update",
	                "redo",
	                "undo",
	                "draw-complete"
	              ],
	              window.drawController.updateVertices
	            );
			}, 
	        
	        // Checks if the last vertex is making the line intersect itself.
	        updateVertices : function updateVertices(event) {
	            // create a polyline from returned vertices
	            if (event.vertices.length > 1) {
	              const result = window.drawController.createGraphic(event);

	              // if the last vertex is making the line intersects itself,
	              // prevent the events from firing
	              if (result.selfIntersects) {
	                event.preventDefault();
	              }
	            }
	          },
	          
	          // create a new graphic presenting the polyline that is being drawn on the view
	          createGraphic:  function createGraphic(event) {
	            const vertices = event.vertices;
	            appConfig.mapView.graphics.removeAll();

	            // a graphic representing the polyline that is being drawn
	            const graphic = new Graphic({
	              geometry: {
	                type: "polyline",
	                paths: vertices,
	                spatialReference: appConfig.mapView.spatialReference
	              },
	              symbol: {
	                type: "simple-line", // autocasts as new SimpleFillSymbol
	                color: [4, 90, 141],
	                width: 4,
	                cap: "round",
	                join: "round"
	              }
	            });

	            // check if the polyline intersects itself.
	            const intersectingSegment = window.drawController.getIntersectingSegment(graphic.geometry);

	            // Add a new graphic for the intersecting segment.
	            if (intersectingSegment) {
	            	appConfig.mapView.graphics.addMany([graphic, intersectingSegment]);
	            }
	            // Just add the graphic representing the polyline if no intersection
	            else {
	            	appConfig.mapView.graphics.add(graphic);
	            }

	            // return intersectingSegment
	            return {
	              selfIntersects: intersectingSegment
	            };
	          },
	          
	          // function that checks if the line intersects itself
	          isSelfIntersecting : function isSelfIntersecting(polyline) {
	            if (polyline.paths[0].length < 3) {
	              return false;
	            }
	            const line = polyline.clone();

	            //get the last segment from the polyline that is being drawn
	            const lastSegment = window.drawController.getLastSegment(polyline);
	            line.removePoint(0, line.paths[0].length - 1);

	            // returns true if the line intersects itself, false otherwise
	            return geometryEngine.crosses(lastSegment, line);
	          },
	          
	          // Checks if the line intersects itself. If yes, change the last
	          // segment's symbol giving a visual feedback to the user.
	          getIntersectingSegment:function getIntersectingSegment(polyline) {
	            if (window.drawController.isSelfIntersecting(polyline)) {
	              return new Graphic({
	                geometry: window.drawController.getLastSegment(polyline),
	                symbol: {
	                  type: "simple-line", // autocasts as new SimpleLineSymbol
	                  style: "short-dot",
	                  width: 3.5,
	                  color: "yellow"
	                }
	              });
	            }
	            return null;
	          },
	          
	          // Get the last segment of the polyline that is being drawn
	          getLastSegment : function getLastSegment(polyline) {
	            const line = polyline.clone();
	            const lastXYPoint = line.removePoint(0, line.paths[0].length - 1);
	            const existingLineFinalPoint = line.getPoint(
	              0,
	              line.paths[0].length - 1
	            );

	            return {
	              type: "polyline",
	              spatialReference: appConfig.mapView.spatialReference,
	              hasZ: false,
	              paths: [
	                [
	                  [existingLineFinalPoint.x, existingLineFinalPoint.y],
	                  [lastXYPoint.x, lastXYPoint.y]
	                ]
	              ]
	            };
	          },
	          
			
		}

	/**
	 * add public functions to base
	 */

	global.drawController = base;

})(window, jQuery)