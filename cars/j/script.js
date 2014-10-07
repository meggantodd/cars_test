
$(function(){
var STOPLIGHT_POSITION = 50;
var SECOND_LIMIT = 100;
var second = 0;
var appOn = true;

var stoplight = {
	green: true,
	changeLight: function() {
		if(this.green) {
	      this.green = false;
	      $('.stoplight .green').addClass('inactive');
	      $('.stoplight .red').removeClass('inactive');
	    } else {
	      this.green = true;
	      $('.stoplight .red').addClass('inactive');
	      $('.stoplight .green').removeClass('inactive');
	    }
	},
	getColorName: function() {
		var color = "";
		if(this.green) {
			color = "green";
		} else {
			color = "red";
		}
		return color;
	}
};

function Car(pos, name) {
	this.position = pos;
	this.name = name;
	this.moving = true;
	this.renderCar = function() {
		$('#road .cars').append(
			'<div class="car '+ this.name +'">' + this.name + '</div>'
			)
		//Put car in starting position
		$('div.' + this.name).css("top", ((this.position/2) + "em"));
	};
	this.setMoving = function() {
		if (!stoplight.green && this.position === STOPLIGHT_POSITION){
			this.moving = false;
		} else {
			this.moving = true;
		}
	};
	this.updatePosition = function() {
		if(this.moving){
			return  this.position += 1;
		} else {
			return;	
		}	
	};
	this.moveCar = function() {
		if(!stoplight.green && this.position === STOPLIGHT_POSITION){
			return
		} else {
			return $('div.' + this.name).css("top", ((this.position/2) + "em"));	
		}		
	};
}

var car1 = new Car(0, "car1");
var car2 = new Car(12, "car2");
var car3 = new Car(24, "car3");

var cars = [car1, car2, car3];

for(i=0; i < cars.length; i++) {
	cars[i].renderCar();
}

updateTable = function(sec, light, pos1, pos2, pos3){
	$('.stats').append('<tr>' +
			'<td>' + sec + '</td>' +
			'<td>' + light + '</td>' +
			'<td>' + pos1 + '</td>' +
			'<td>' + pos2 + '</td>' +
			'<td>' + pos3 + '</td>' +
		'</tr>');
};
//Write first row of table before all the values change
updateTable(second, stoplight.getColorName(), cars[0].position, cars[1].position, cars[2].position);

updateWorld = function() {
	second += 1;
	positions = [2];
	for(i=0; i < cars.length; i++) {
		cars[i].setMoving();
		cars[i].updatePosition();
		cars[i].moveCar();
		positions[i] = cars[i].position;
	}
	if(second%10 === 0) {
		stoplight.changeLight();
	}
	updateTable(second, stoplight.getColorName(), positions[0], positions[1], positions[2]);
};

//World clock
setInterval(function() {
	if(appOn && (second < SECOND_LIMIT)){ 
		updateWorld(); 
	}
}, 200);

//Pause the app
$("#pause").click(function() {
    if(appOn) {
    	appOn = false;
    } else {
    	appOn = true;
    }
});

});