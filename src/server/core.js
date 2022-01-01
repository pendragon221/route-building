/* eslint-disable no-undef */
ymaps.ready(init);
function init() {
    var myMap = new ymaps.Map("map", {
        center: [53.90798227, 30.34363726],
        zoom: 16,
    });
    var pointA = "Беларусь Могилев Улица Пионерская дом 40";
    var pointB = "Беларусь Могилев Улица Каштановая Дом 34";
    ymaps.route([pointA, pointB]).then(
        function (res) {
            var pathsObjects = ymaps.geoQuery(res.getPaths()),
                edges = [];
            pathsObjects.each(function (path) {
                var coordinates = path.geometry.getCoordinates();
                for (var i = 1, l = coordinates.length; i < l; i++) {
                    edges.push({
                        type: 'LineString',
                        coordinates: [coordinates[i], coordinates[i - 1]]
                    });
                }
            }
            )
            var routeObjects = ymaps.geoQuery(edges).addToMap(myMap);
            var dist = 0;
            routeObjects.each(function (path) {
                dist += path.geometry.getDistance();
            });
            console.log(dist);
        }
    )
}

// ymaps$1
//             .load()
//             .then(maps => {
//                 const map = new maps.Map('map-container', {
//                     center: [53.90798227, 30.34363726],
//                     zoom: 16
//                 });

//                 this.props.saveMapObj(map)

//                 var pointA = "Belarus, Mahilioŭ, prospekt Mira, 43";
//                 var pointB = "Беларусь Могилев Улица Каштановая Дом 34";
//                 maps.route([pointA, pointB]).then(
//                     function (res) {
//                         var pathsObjects = maps.geoQuery(res.getPaths()),
//                             edges = [];
//                         pathsObjects.each(function (path) {
//                             var coordinates = path.geometry.getCoordinates();
//                             for (var i = 1, l = coordinates.length; i < l; i++) {
//                                 edges.push({
//                                     type: 'LineString',
//                                     coordinates: [coordinates[i], coordinates[i - 1]]
//                                 });
//                             }
//                         }
//                         )
//                         // console.log('qwwrty: ' + edges[0].coordinates[0]);
//                         map.setCenter(edges[0].coordinates[0])
//                         var routeObjects = maps.geoQuery(edges).addToMap(map);
//                         var dist = 0;
//                         routeObjects.each(function (path) {
//                             dist += path.geometry.getDistance();
//                         });
//                         console.log(dist);
//                     }
//                 )
//             })
//             .catch(error => console.log('Failed to load Yandex Maps', error));