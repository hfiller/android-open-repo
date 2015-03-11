var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log("device ready");
       
        app.receivedEvent('deviceready');
        register()

    },

    register: function() {
        var pluginDef = {
            "name": "AltostratusPlugin",
            "namespace": "dexit.test.xKBplugin",
            "extractDataFunction": "extract",
            "pluginUpdatesFunction": "update"
        }
        dexit.device.sdk.xkbPluginManager.registerPlugin(pluginDef);

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var dexit = {test:{xKBplugin:{}}};

dexit.test.xKBplugin.extract = function(args) {
    var pos = navigator.geolocation.getCurrentPosition(
          function(position) {
              console.log(position.coords.latitude + ',' + position.coords.longitude);
              var x = {
                  position:pos,
                  time:(new Date().getTime())
              };
              console.log(x);
              return position;
          },
          function() {
              console.log('Error getting location');
          }
    );
};

dexit.test.xKBplugin.update = function(args) {
    var pos = navigator.geolocation.getCurrentPosition(
        function(position) {
            console.log(position.coords.latitude + ',' + position.coords.longitude);
            return position;
        },
        function() {
            console.log('Error getting location');
        }
    );

    return {
        position:pos,
        time:(new Date().getTime())
    };
};