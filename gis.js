data = {
    "locations": [
        { "location": "Idaho Falls", "latitude": 43.54661906107555, "longitude": -112.05167110312037, "address": "950 Lindsay Blvd, Idaho Falls, ID 83401", "phone": "2085289210" },
        { "location": "Pocatello", "latitude": 42.9135731094492, "longitude": -112.46572643107172, "address": "4310 Yellowstone Ave, Chubbuck, ID 83202", "phone": "2082381223" },
        { "location": "Burley", "latitude": 42.56521280337678, "longitude": -113.79181667108607, "address": "611 N Overland Ave, Burley, ID 83318", "phone": "2086788786" },
        { "location": "Logan", "latitude": 41.75069404245561, "longitude": -111.83502946157103, "address": "1007 N Main St #140, Logan, UT 84341", "phone": "4357522599" },
        { "location": "Murray", "latitude": 40.67495661748217, "longitude": -111.90275171539277, "address": "420 W 4500 S, Murray, UT 84123", "phone": "8012628251" },
        { "location": "Pendleton", "latitude": 45.66170606313516, "longitude": -118.80597733073675, "address": "610 Tutuilla Rd, Pendleton, OR 97801", "phone": "5412760215" },
        { "location": "Fort Collins", "latitude": 40.581905183068116, "longitude": -105.00721896142475, "address": "420 Centro Way, Fort Collins, CO 80524", "phone": "9702211493" },
        { "location": "Thornton", "latitude": 39.884950578335086, "longitude": -104.98266461539276, "address": "350 E 104th Ave, Thornton, CO 80233", "phone": "3034509962" },
        { "location": "Lakewood", "latitude": 39.724166933822715, "longitude": -105.13265446936074, "address": "565 Union Blvd, Lakewood, CO 80228", "phone": "3039882025" },
        { "location": "Twin Falls", "latitude": 42.59220765513869, "longitude": -114.47556576405523, "address": "291 Pole Line Rd E, Twin Falls, ID 83301", "phone": "2087368878" },
        { "location": "Meridian", "latitude": 43.61891425564631, "longitude": -116.35680578652016, "address": "3155 E Fairview Ave, Meridian, ID 83642", "phone": "2088989599" },
        { "location": "Boise", "latitude": 43.569667399251486, "longitude": -116.21339370001218, "address": "2580 W Airport Way, Boise, ID 83705", "phone": "2083449092" },
        { "location": "Nampa", "latitude": 43.598481912147115, "longitude": -116.57355856442409, "address": "607 Northside Blvd, Nampa, ID 83687", "phone": "2084676579" },
        { "location": "Caldwell", "latitude": 43.66175437120551, "longitude": -116.65486973558806, "address": "3512 Franklin Rd, Caldwell, ID 83605", "phone": "2084531517" },
        { "location": "Coeur d'Alene", "latitude": 47.698314105218635, "longitude": -116.7803495000061, "address": "2300 N 4th St, Coeur d'Alene, ID 83814", "phone": "2086643712" },
        { "location": "Post Falls", "latitude": 47.71176119982534, "longitude": -116.92068820000608, "address": "1670 E Schneidmiller Ave, Post Falls, ID 83854", "phone": "2087736988" },
        { "location": "Honolulu", "latitude": 21.27844889357075, "longitude": -157.83154815806202, "address": "205 Lewers St, Honolulu, HI 96815", "phone": "8089238188" },
        { "location": "College Station", "latitude": 30.627277990986823, "longitude": -96.33366167496548, "address": "607 Texas Ave, College Station, TX 77840", "phone": "9794852987" },
        { "location": "Gretna", "latitude": 41.091854657069895, "longitude": -96.25468347135899, "address": "15010 NE-31, Gretna, NE 68028", "phone": "4023320400" },
        { "location": "Queens", "latitude": 40.7330542181558, "longitude": -73.7340578184644, "address": "235-20 Hillside Avenue, Queens, NY 11427", "phone": "9294330154" },
        // { "location": "", "latitude": , "longitude": , "address": "", "phone": "" },
    ]
}
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/widgets/Locate",
    "esri/widgets/Search",
    "esri/widgets/Legend"
], function(Map, MapView, Graphic, GraphicsLayer, FeatureLayer, Locate, Search, Legend) {

    var myMap = new Map({
        basemap: "hybrid"
    });

    var myView = new MapView({
        container: "viewDiv", // HTML ID 
        map: myMap, // BaseMap Created
        zoom: 1 // zoom in level
    });

    var graphicsLayer = new GraphicsLayer();
    myMap.add(graphicsLayer);

    for (item of data.locations) {
        var marker = {
            type: "simple-marker",
            style: "circle",
            color: [226, 119, 40]
        };

        var location = {
            type: "point",
            latitude: item.latitude,
            longitude: item.longitude
        };

        var popup_attributes = {
            adress: item.address,
            phone: item.phone
        }

        var popup_template = {
            title: item.location + " Dennys",
            content: "<br><b>Adress</b>: {adress}<br><b>Phone</b>: {phone}"
        }

        var graphic = new Graphic({
            geometry: location,
            symbol: marker,
            attributes: popup_attributes,
            popupTemplate: popup_template
        });
        graphicsLayer.add(graphic);

    }

    var locate = new Locate({
        view: myView,
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
            options.target.scale = 1000000; // 1/1000000 scale
            return view.goTo(options.target);
        }
    });
    myView.ui.add(locate, "top-left");

    var search = new Search({
        view: myView
    });
    myView.ui.add(search, "top-right");

});