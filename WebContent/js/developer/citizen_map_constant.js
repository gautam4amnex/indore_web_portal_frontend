(function(global, $) {
	"use stricts;"

global.prefix_layer_url = "https://map.muzaffarpursmartcity.org/arcgis/rest/services/";
//global.INDORE_LAYERS_SYMBOLOGY = global.prefix_layer_url + "iscdl_basemap_v6_10122021/MapServer";
//global.ISCDL_FEATURE_SERVER_URL = global.prefix_layer_url + "iscdl_basemap_v6_10122021/FeatureServer/";

//https://map.muzaffarpursmartcity.org/arcgis/rest/services/Hosted/Test_Ortho_Tile/MapServer


global.INDORE_LAYERS_SYMBOLOGY = global.prefix_layer_url + "2d_test/MapServer";
global.ISCDL_FEATURE_SERVER_URL = global.prefix_layer_url + "2d_test/FeatureServer";

/**
 * Citizen Portal Map Constants
 */


global.MAP_CENTER_POINT = [75.8577, 22.7196]; 
global.MAP_MIN_ZOOM = 11;
global.MAP_MAX_ZOOM = 24;
global.MAP_INITIAL_ZOOM = 11;

global.POLICE_STATION_BOUNDARY = global.INDORE_LAYERS_SYMBOLOGY + "/" + 153;
global.POLICE_STATION_LOCATION = global.INDORE_LAYERS_SYMBOLOGY + "/" + 152;

global.WARD_BOUNDARY = global.INDORE_LAYERS_SYMBOLOGY + "/"+ 86;
global.IMC_BOUNDARY = global.INDORE_LAYERS_SYMBOLOGY + "/" + 84;
global.ZONE_BOUNDARY = global.INDORE_LAYERS_SYMBOLOGY + "/" + 85;

//global.PROPERTY_TAX_LAYER = global.INDORE_LAYERS_SYMBOLOGY + "/" + 87;// Need to change remaining
global.PROPERTY_TAX_LAYER = global.prefix_layer_url +  'Property_tax/property_tax/MapServer/0';

/**
 * Satellite Image 2015
 */
global.TILED_IMAGE_2015 = global.prefix_layer_url + "Hosted/Test_Ortho_Tile/MapServer";//

/**
 * Satellite Image 2017
 */
global.ISCDL_SAT_IMAGE_2017_1 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_1/MapServer";//
global.ISCDL_SAT_IMAGE_2017_2 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_2/MapServer";//
global.ISCDL_SAT_IMAGE_2017_3 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_3/MapServer";//
global.ISCDL_SAT_IMAGE_2017_4 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_4/MapServer";//
global.ISCDL_SAT_IMAGE_2017_5 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_5/MapServer";//
global.ISCDL_SAT_IMAGE_2017_6 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_6/MapServer";//
global.ISCDL_SAT_IMAGE_2017_7 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_7/MapServer";//
global.ISCDL_SAT_IMAGE_2017_8 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_8/MapServer";//
global.ISCDL_SAT_IMAGE_2017_9 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_9/MapServer";//
global.ISCDL_SAT_IMAGE_2017_10 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_10/MapServer";//
global.ISCDL_SAT_IMAGE_2017_11 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_11/MapServer";//
global.ISCDL_SAT_IMAGE_2017_12 = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_Sat_Image_2017_12/MapServer";//

/**
 * Ortho-mosaic Images
 */

global.POCKET_1_ORTHO_PART_1 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_1/MapServer";//
global.POCKET_1_ORTHO_PART_2 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_2/MapServer";//
global.POCKET_1_ORTHO_PART_3 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_3/MapServer";//
global.POCKET_1_ORTHO_PART_4_1 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_4_1/MapServer";//
global.POCKET_1_ORTHO_PART_4_2 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_4_2/MapServer";//
global.POCKET_1_ORTHO_PART_5 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_5/MapServer";//
global.POCKET_1_ORTHO_PART_6 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_6/MapServer";//
global.POCKET_1_ORTHO_PART_7 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_7/MapServer";//
global.POCKET_1_ORTHO_PART_8 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_8/MapServer";//
global.POCKET_1_ORTHO_PART_9 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_9/MapServer";//
global.POCKET_1_ORTHO_PART_10 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_10/MapServer";//
global.POCKET_1_ORTHO_PART_11 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_Part_11/MapServer";//

global.POCKET_1_ORTHO_PART_12 = global.prefix_layer_url + "Hosted/ISCDL_Orthomosaic_12/MapServer";//
global.POCKET_1_ORTHO_PART_14 = global.prefix_layer_url + "Hosted/ISCDL_orthomosaic_14/MapServer";//
global.POCKET_1_ORTHO_PART_15 = global.prefix_layer_url + "Hosted/Iscdl_Orthomosaic_15/MapServer";//
global.POCKET_1_ORTHO_PART_16 = global.prefix_layer_url + "Hosted/Iscdl_Orthomosaic_16/MapServer";//

global.POCKET_1_ORTHO_PART_17 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_17_1/MapServer";//
global.POCKET_1_ORTHO_PART_18 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_18/MapServer";//
global.POCKET_1_ORTHO_PART_19 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_19/MapServer";//
global.POCKET_1_ORTHO_PART_20 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_20/MapServer";//
global.POCKET_1_ORTHO_PART_21 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_21/MapServer";//
global.POCKET_1_ORTHO_PART_22 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_22/MapServer";//
global.POCKET_1_ORTHO_PART_23 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_23/MapServer";//
global.POCKET_1_ORTHO_PART_24 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_24/MapServer";//
global.POCKET_1_ORTHO_PART_25 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_25/MapServer";//
global.POCKET_1_ORTHO_PART_26 = global.prefix_layer_url + "ISCDL_Orthomosaic_Part_26/MapServer";//
global.POCKET_1_ORTHO_PART_27 = global.prefix_layer_url + "iscdl__orthomosaic_27/MapServer";//
global.POCKET_1_ORTHO_PART_28 = global.prefix_layer_url + "iscdl_orthomosaic_28/MapServer";//
global.POCKET_1_ORTHO_PART_31 = global.prefix_layer_url + "iscdl_orthomosaic_31/MapServer";//
global.POCKET_1_ORTHO_PART_32 = global.prefix_layer_url + "iscdl_orthomosaic_32/MapServer";//

//Temporary remove IMC main layer id for feature Info tool
global.CITIZEN_ADMINISTRATIVE_BOUNDARY = 82;

//Temporary remove Environmental main layer id for feature Info tool
global.CITIZEN_ENVIORNMENTAL = 63;

//Temporary remove AICTSL main layer id for feature Info tool
global.CITIZEN_TRANSPORTATION = 55;

//Search layer id

//CHANGE MADE ON 22122021 AS PER CEO SIR SAID
global.Airport = 1;
global.Bartan_Bank = 4;
global.Blood_Bank = 5;
global.CCTV_Location = 6;
global.Digital_Signboard = 8;
global.Fire_Station = 11;
global.Food_ATM = 12;
global.Ghats = 13;
global.Graveyard = 15;
global.Heritage_Tourism_Site = 16;
global.High_Mast_Light = 17;
global.Hostel = 18;
global.Library_Facility = 19;
global.Museum = 23;
global.Neki_Ki_Diwar = 24;
global.Oldage_Home = 25;
global.Orphanange = 26;
global.Parking = 27;
global.Park_Garden = 28;
global.Playground = 30;
global.Police_Post = 31;
global.Post_Office = 32;
global.Public_Distribution = 33;
global.Railway = 34;
global.Railway_Station = 35;
global.Shopping_Mall = 37;
global.Street_Food_Zone = 39;
global.Swimming_Pool = 40;
global.SWM_C_D_Plants = 42;
global.SWM_CNG_Plants = 43;
global.SWM_GTS = 44;
global.SWM_Trenching_Ground = 45;

global.Toilet_Urinal = 47;
global.Toilet_CT = 48;
global.Toilet_PT = 49;

global.Unipole = 50;
global.Water_ATM = 51;
global.WiFi_Hotspot = 52;

//CHANGE MADE ON 22122021 AS PER CEO SIR SAID


global.Atm = 2;
global.Bank = 3;
global.Bus_Stops =56;
global.College_University = 61;
global.Cultural_Facility = 7;
global.Litter_Bin = 9;
global.Entertainment_Facility = 10;
global.Government_Office = 14;
global.Hospital = 73;
global.Market = 20;
global.Milk_Booth = 21;
global.MP_Online_Center = 22;
global.Petrol_Pump = 29;
global.Primary_School = 60;
global.Religious_Facility = 36;
global.Secondary_School = 62;
global.Sports_Facility = 38;

//know your ward id geo-enabled

global.Pharmacy = 72;// Layer not available

/**
 * ---------------------------- 3D Map Constant ------------------------------------------
 */

//scene layer

global.BUILDING_SCENE_LAYER = global.prefix_layer_url + "Hosted/IMC_Building_2020/SceneServer/layers/0";//
global.ELECTRICAL_POLE_SCENE_LAYER = global.prefix_layer_url + "Hosted/Electricpole/SceneServer/layers/0";//
global.TRAFFIC_SIGNAL_SCENE_LAYER = global.prefix_layer_url + "Hosted/Trafficsignal/SceneServer/layers/0";//
global.STREET_LIGHT_SCENE_LAYER = global.prefix_layer_url + "Hosted/Streetlight_1/SceneServer/layers/0";//
global.TREE_SCENE_LAYER = global.prefix_layer_url + "Hosted/iscdl_Tree_3D_shape/SceneServer/layers/0";//
global.OVERHEAD_TANK_SCENE_LAYER = global.prefix_layer_url + "Hosted/OverHead_Tank/SceneServer/layers/0";//
global.WATER_BODIES_FEATURE_LAYER = global.prefix_layer_url + "Hosted/Waterbody/FeatureServer/layers/0";//
global.MANHOLE_FEATURE_LAYER = global.prefix_layer_url + "Hosted/Manhole/FeatureServer/layers/0";//
global.ROAD_SCENE_LAYER = global.prefix_layer_url + "Hosted/Road_5/SceneServer/layers/0";//
//global.ROAD_SCENE_LAYER = global.prefix_layer_url + "Hosted/iscdl_road/FeatureServer/layers/0";//

//image layer
global.DEM_P1_P2_IMAGE_LAYER = global.prefix_layer_url + "ISCDL_3D_226_Km/Dem/ImageServer";//
global.ISCDL_RIVER_DEM_IMAGE_LAYER = global.prefix_layer_url + "River_DEM_Basemap/ImageServer";//
global.ISCDL_RIVER_DEM_TIFF = global.prefix_layer_url + "ABD_DEM_0_5_WGS/ImageServer";//
global.ISCDL_SRTM_IMAGE_LAYER = global.prefix_layer_url + "ISCDL_DEM_SRTM_30M_tif/ImageServer";//

//feature layer

global.DIVIDER_FEATURE_LAYER = global.ISCDL_FEATURE_SERVER_URL + "90";
global.FOOTPATH_FEATURE_LAYER = global.ISCDL_FEATURE_SERVER_URL + "97";
global.ROAD_FEATURE_LAYER = global.ISCDL_FEATURE_SERVER_URL + "100";
//global.ROAD_FEATURE_LAYER = global.prefix_layer_url + "Hosted/Road3/FeatureServer/layers/0";

global.ISCDL_RIVER_CONTOUR = global.prefix_layer_url + "Hosted/River_Contour_ISCDL/FeatureServer/layers/0";//


//River DEM

global.DEM_SRTM = global.prefix_layer_url + "ISCDL_3D_226_Km/ISCDL_DEM_SRTM_1/MapServer";
global.RIVER_DEM = global.prefix_layer_url + "ISCDL_3D_226_Km/River_DEM_ISCDL/MapServer";

//LIDAR


global.LIDAR_POINT_CLOUD_LAYER = global.prefix_layer_url + "Hosted/ABD_Cloud_19_dec/SceneServer/layers/0";//

global.ISCDL_R1_TIFF = global.prefix_layer_url + "River_Ortho/MapServer";

})(window, jQuery)