function fuk3d(){
    // Configuration
    var maxRadius = 100;
    var gap = 10;
    var padding = 25;
    var height = (maxRadius + padding) * 2;
    var width = (maxRadius + padding) * 2;

// Random data
    var dataSet = [{
        value: 34,
        total: 100
    }, {
        value: 21,
        total: 100
    }, {
        value: 43,
        total: 121
    }, {
        value: 35,
        total: 120
    }, {
        value: 353,
        total: 520
    }, {
        value: 135,
        total: 420
    }, {
        value: 315,
        total: 420
    }, {
        value: 15,
        total: 21
    }, {
        value: 35,
        total: 340
    }, {
        value: 35,
        total: 340
    }];

// Append SVG element to body
    var svg = d3.select('body').append('svg').attr('height', height).attr('width', width).attr('class', 'rings');

// Append a bunch of circle elements based on number of items in the dataSet and set attributes
    var rings = svg.selectAll('circle').data(dataSet).enter().append('circle').attr('cx', width / 2).attr('cy', height / 2).attr('fill', 'none').attr('class', 'ring');

// Build the initial state of the rings
    rings.each(function (d, i) {
        var element = this;
        var radius = maxRadius - gap * i;
        // Calculates the circumference of the circle
        var length = Math.PI * (radius * 2);
        // Calculate the percentage of the data.value over data.total
        var value = d.value / d.total * length;

        // Animates the stroke depending on the percentage calculated
        d3.select(element).attr('r', radius).attr('stroke-dasharray', length).attr('stroke-dashoffset', length).transition().duration(2000).attr('stroke-dashoffset', value);
    });

    function rotate(element) {
        // Randomiser to set the direction of the rotation
        var s = Math.floor(Math.random() * 11) % 2 === 0 ? '-' : '';
        // Initial position of rings
        element.transform('r0, ' + width / 2 + ',' + height / 2);
        // Randomised rotation animation which recursively calls itself as a callback
        element.animate({ transform: 'r' + s + '360, ' + width / 2 + ',' + height / 2 }, Math.random() * 1000 + 2000, mina.linear, function () {
            return rotate(element);
        });
    };

// Rotating animation using Snap.svg
    rings.each(function () {
        var element = this;
        // Start the animation
        rotate(Snap(element));
    });

}