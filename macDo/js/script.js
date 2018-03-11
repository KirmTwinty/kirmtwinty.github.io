/* Global variables */
var chart;
var item_list;
var DB;
var SECTIONS;
var ACTIVITIES;
var newchart=true;
var total_energie;
var chartOptions = 	{
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop : true,

    //String - The colour of the label backdrop
    scaleBackdropColor : "rgba(255,255,255,0.75)",

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero : true,

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY : 2,

    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX : 2,

    //Boolean - Show line for each value in the scale
    scaleShowLine : true,

    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke : true,

    //String - The colour of the stroke on each segement.
    segmentStrokeColor : "#fff",

    //Number - The width of the stroke value in pixels
    segmentStrokeWidth : 2,

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect.
    animationEasing : "easeOutBounce",

    //Boolean - Whether to animate the rotation of the chart
    animateRotate : true,

    //Boolean - Whether to animate scaling the chart from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    //legendTemplate : ""
}
var data = [
    {
        value: 0,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Lipides"
    },
    {
        value: 0,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Glucides"
    },
    {
        value: 0,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Protides"
    },
    {
        value: 0,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Autre"
    },

];
function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
window.onload = function(){
    DB = JSON.parse(database);
    SECTIONS = JSON.parse(sections);
    ACTIVITIES = JSON.parse(activities);
    total_energie = 0;
    // Populate the burgers and sections
    var content = '';
    for(var sec = 0; sec < SECTIONS.length; sec++){
	content+='<h1>'+SECTIONS[sec]+'</h1>';
	for(var item=0; item<DB.length;item++){
	    if(DB[item].section == sec){
		
		content+='<div class="view view-ninth" onclick="addItem(\''+DB[item].nom+'\','+DB[item].lipides+','+DB[item].glucides+','+DB[item].protides+','+DB[item].autres+','+DB[item].energie+')">';
		content+='<img width="306px" height="134px" src="img/'+DB[item].image+'" onerror="if (this.src != \'error.jpg\') this.src = \'img/unknown.png\';" />';
		content+='<div class="mask mask-1"></div>';
		content+='<div class="mask mask-2"></div>';
		
		content+='<div class="content">';
		content+='<h2>'+DB[item].nom+'</h2>';
		content+='<span class="energie-el">'+DB[item].energie+'kJ</br>'+Math.round(DB[item].energie/4.184)+'kcal</span>';
		content+='<ul>';
		content+='<li class="lipides-el">Lipides : '+DB[item].lipides+'g</li>';
		content+='<li class="glucides-el">Glucides : '+DB[item].glucides+'g</li>';
		content+='<li class="protides-el">Protides : '+DB[item].protides+'g</li>';
		content+='<li class="autres-el">Autres : '+DB[item].autres+'g</li>';
		content+='</ul>';
		content+='</div>';
		content+='</div>';
	    }
	}
    }    
    document.getElementById('container').innerHTML = content;

    // Do the same for the activities
    content = '';
    content+='<select id="activity_choice" onchange="updateActivite()"><option value="" disabled selected>Choisir une activité</option>';
    for(var act=0; act < ACTIVITIES.length; act++){
	content+='<option value="' + act + '">' + ACTIVITIES[act].nom + '</option>';
    }
    content+='</select>';
    document.getElementById('activities').innerHTML = content;

    Chart.defaults.global = {
	// Boolean - Whether to animate the chart
	animation: true,

	// Number - Number of animation steps
	animationSteps: 60,

	// String - Animation easing effect
	// Possible effects are:
	// [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
	//  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
	//  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
	//  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
	//  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
	//  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
	//  easeOutElastic, easeInCubic]
	animationEasing: "easeOutQuart",

	// Boolean - If we should show the scale at all
	showScale: true,

	// Boolean - If we want to override with a hard coded scale
	scaleOverride: false,

	// ** Required if scaleOverride is true **
	// Number - The number of steps in a hard coded scale
	scaleSteps: null,
	// Number - The value jump in the hard coded scale
	scaleStepWidth: null,
	// Number - The scale starting value
	scaleStartValue: null,

	// String - Colour of the scale line
	scaleLineColor: "rgba(0,0,0,.1)",

	// Number - Pixel width of the scale line
	scaleLineWidth: 1,

	// Boolean - Whether to show labels on the scale
	scaleShowLabels: true,

	// Interpolated JS string - can access value
	scaleLabel: "<%=value%>g",

	// Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
	scaleIntegersOnly: true,

	// Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	scaleBeginAtZero: false,

	// String - Scale label font declaration for the scale label
	scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	// Number - Scale label font size in pixels
	scaleFontSize: 12,

	// String - Scale label font weight style
	scaleFontStyle: "normal",

	// String - Scale label font colour
	scaleFontColor: "#666",

	// Boolean - whether or not the chart should be responsive and resize when the browser does.
	responsive: false,

	// Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
	maintainAspectRatio: true,

	// Boolean - Determines whether to draw tooltips on the canvas or not
	showTooltips: true,

	// Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
	customTooltips: false,

	// Array - Array of string names to attach tooltip events
	tooltipEvents: ["mousemove", "touchstart", "touchmove"],

	// String - Tooltip background colour
	tooltipFillColor: "rgba(0,0,0,0.8)",

	// String - Tooltip label font declaration for the scale label
	tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	// Number - Tooltip label font size in pixels
	tooltipFontSize: 14,

	// String - Tooltip font weight style
	tooltipFontStyle: "normal",

	// String - Tooltip label font colour
	tooltipFontColor: "#fff",

	// String - Tooltip title font declaration for the scale label
	tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	// Number - Tooltip title font size in pixels
	tooltipTitleFontSize: 14,

	// String - Tooltip title font weight style
	tooltipTitleFontStyle: "bold",

	// String - Tooltip title font colour
	tooltipTitleFontColor: "#fff",

	// Number - pixel width of padding around tooltip text
	tooltipYPadding: 6,

	// Number - pixel width of padding around tooltip text
	tooltipXPadding: 6,

	// Number - Size of the caret on the tooltip
	tooltipCaretSize: 8,

	// Number - Pixel radius of the tooltip border
	tooltipCornerRadius: 6,

	// Number - Pixel offset from point x to tooltip edge
	tooltipXOffset: 10,

	// String - Template string for single tooltips
	tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>g",

	// String - Template string for multiple tooltips
	multiTooltipTemplate: "<%= value %>",

	// Function - Will fire on animation progression.
	onAnimationProgress: function(){},

	// Function - Will fire on animation completion.
	onAnimationComplete: function(){}
	
	
	
    }
    
    // Get the context of the canvas element we want to select
    //var ctx = document.getElementById("myChart").getContext("2d");
    //chart = new Chart(ctx).PolarArea(data,chartOptions);
    
    
    
}

function removeItem(l,p,g,a, energie){
    
    // Update the chart
    chart.segments[0].value -= l;
    chart.segments[1].value -= p;
    chart.segments[2].value -= g;
    chart.segments[3].value -= a;
    
    total_energie -= energie;
    
    
    if(chart.segments[0].value < 0.01 && chart.segments[1].value < 0.01 && chart.segments[2].value < 0.01 && chart.segments[3].value < 0.01){
	chart.segments[0].value = 0;
	chart.segments[1].value = 0;
	chart.segments[2].value = 0;
	chart.segments[3].value = 0;
	newchart=true;
	total_energie = 0;
	
    }
    
    updateEnergie();
    updateActivite();
    chart.update();
    
}
function addItem(nom,l,p,g,a, energie){
    
    if(newchart){
	total_energie = energie;
	
	
	data[0]['value'] = l;
	data[1]['value'] = p;
	data[2]['value'] = g;
	data[3]['value'] = a;
	var ctx = document.getElementById("myChart").getContext("2d");
	ctx.canvas.width = window.innerWidth * 25 / 100;
	ctx.canvas.height = window.innerHeight * 25 / 100;
	chart = new Chart(ctx).PolarArea(data,chartOptions);
	newchart=false;
    }else{
	total_energie =Math.floor((total_energie + energie) *10) / 10;
	// Update the chart
	chart.segments[0].value = Math.floor((chart.segments[0].value + l) * 10)/10;
	chart.segments[1].value = Math.floor((chart.segments[1].value + p) * 10)/10;
	chart.segments[2].value = Math.floor((chart.segments[2].value + g) * 10)/10;
	chart.segments[3].value = Math.floor((chart.segments[3].value + a) * 10)/10;
	// chart.segments[1].value += p;
	// chart.segments[2].value += g;
	// chart.segments[3].value += a;
	
	chart.update();
    }
    updateEnergie();
    updateActivite();
    /*
     * Add items to a list - from cssanimation.rocks/list-items/
     */
    var list = document.getElementById('list');
    var newLI = document.createElement('li');
    newLI.innerHTML = nom + '<span style="position:absolute;right:4px;overflow:hidden;z-index:0"> (' + energie +'kJ)</span>';
    newLI.onclick=function(){var li = this; var ul = this.parentNode; ul.removeChild(li); removeItem(l,p,g,a, energie)};
    list.appendChild(newLI);
    setTimeout(function() {
	newLI.className = newLI.className + " show";
    }, 10);

}
function updateEnergie(){
    
    en = document.getElementById("energy");
    en.innerHTML = "Energie Totale : " + total_energie + "kJ (" + kj_to_kcal(total_energie) + "kcal)";
    if(total_energie == 0)
	en.style.visibility = "hidden";
    else
	en.style.visibility = "visible";
}
function updateActivite(){
    ac = document.getElementById("activity");
    e = document.getElementById("activity_choice");
    
    if(total_energie == 0 || e.selectedIndex <= 0){
	ac.style.visibility = "hidden";
    }else{
	ac.style.visibility = "visible";
	
	kcal = kj_to_kcal(total_energie);
	duree = kcal / ACTIVITIES[e.selectedIndex-1].poids1;
	
	ac.innerHTML = "Durée : " + getTimeString(duree);

    }
}
function getTimeString(d){
    h = Math.floor(d);
    mn = Math.floor((d - h)*60);
    s = Math.floor((d - h - mn/60)*3600);
    return h + " h, " + mn + " mn, " + s + " s.";
}
function kj_to_kcal(kj){
    return Math.floor(kj /  4.184);
}
