import Arc from'./Arc.js';
import './Clock.css';
import React from 'react';

export default class Clock {

    constructor(colors, radius, weight, emptyArcColor, isReverse) {
        this.radius = radius;
        this.weight = weight;
        this.emptyArcColor = emptyArcColor;
        this.dayTime = 0;
        this.lastKeyTime = 0;        // number of seconds passed from the "last key time"
        this.colors = colors;
        this.keyTimeHours = [ 4, 10, 16, 23];
        this.keyTimeHoursIndex = 0;

        this.hourProgress = 0;
        this.minuteProgress = 0;
        this.secondProgress = 0;

        this.isReverse = isReverse;

        this.today = new Date(); 
        this.getCurrentTime();
        
        this.hourColor = this.colors[this.dayTime][0];
        this.minuteColor = this.colors[this.dayTime][1];
        this.secondColor = this.colors[this.dayTime][2];

    }


    // we give this function a startColor and an endColor, we calculate the color of the arcs based on how much time passed from the "startTime"
    // which is when they were at the startColor and on how much time is left to the "endTime" which is the time aat which the arcs will be at the endColor
    // the progress value goes from 0 to 1 and indicates how much time as passed from startTime (0) and how much is left to endTime (1)

    updateColor(startColor, endColor, progress) {
                
        var startColorRGB = this.hexToRgb(startColor);
        var endColorRGB = this.hexToRgb(endColor);

        var result = [ 0, 0, 0];
        
        for (var i = 0; i < 3; i++) result[i] = Math.round((progress * startColorRGB[i] + (1 - progress) * endColorRGB[i]));
        return this.rgbToHex(result);
    }

    rgbToHex(rgbValue) {
        return ("#" + rgbValue[0].toString(16) + rgbValue[1].toString(16) + rgbValue[2].toString(16));
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? [ parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ] : null;
    }
        

    getCurrentTime() {

        var currentHours = this.today.getHours();
        var currentMinutes = this.today.getMinutes();
        var currentSeconds = this.today.getSeconds();
        var currentMillis = this.today.getMilliseconds();

        if (currentHours <= this.keyTimeHours[0]) { this.dayTime = 3; this.lastKeyTime = 0; this.keyTimeHoursIndex = 0; }
        if (currentHours >= this.keyTimeHours[1]) { this.dayTime = 1; this.lastKeyTime = 0; this.keyTimeHoursIndex = 1; }
        if (currentHours >= this.keyTimeHours[2]) { this.dayTime = 2; this.lastKeyTime = 0; this.keyTimeHoursIndex = 2; }
        if (currentHours >= this.keyTimeHours[3]) { this.dayTime = 3; this.lastKeyTime = 0; this.keyTimeHoursIndex = 3; }

        this.lastKeyTime = currentSeconds + (currentMinutes * 60) + ((currentHours - this.keyTimeHours[this.keyTimeHoursIndex]) * 3600);

        if(this.isReverse) {
            currentHours = 23- currentHours;
            currentMinutes = 59 - currentMinutes;
            currentSeconds = 59 - currentSeconds;
            currentMillis = 999 - currentMillis;
        }

        this.updateArcs(currentHours, currentMinutes, currentSeconds, currentMillis);

        this.currentTime = (currentHours < 10 ? "0" : "") + currentHours + ':' + (currentMinutes < 10 ? "0" : "") + currentMinutes + ':' + (currentSeconds < 10 ? "0" : "") + currentSeconds;
    }

    updateArcs(currentHours, currentMinutes, currentSeconds, currentMillis) {
        
        // update the progress of the arcs
        
        this.secondProgress =  currentSeconds / 60 + (currentMillis / 60000);
        this.minuteProgress = currentMinutes / 60 + (currentSeconds / 3600) + (currentMillis / 3600000);
        this.hourProgress = currentHours / 24 + (currentMinutes / 1440) + (currentSeconds / 86400);

        // update the color of the arcs

        this.hourColor = this.updateColor(this.colors[this.dayTime][0], this.colors[((this.dayTime + 1) % 4)][0], this.lastKeyTime / 21600);
        this.minuteColor = this.updateColor(this.colors[this.dayTime][1], this.colors[((this.dayTime + 1) % 4)][1], this.lastKeyTime / 21600);
        this.secondColor = this.updateColor(this.colors[this.dayTime][2], this.colors[((this.dayTime + 1) % 4)][2], this.lastKeyTime / 21600);

        console.log(this.hourColor + " " + this.minuteColor + " " + this.secondColor);

                
    }

  
  render() {    
    return (
        <div className="clock" style={{width:this.radius, height:this.radius}}>
            <div className='hourArc'>
                {new Arc(this.hourProgress, this.hourColor, this.radius, this.weight, this.emptyArcColor).render()}
                <div className='minuteArc'>
                    {new Arc(this.minuteProgress, this.minuteColor, this.radius*0.87, this.weight, this.emptyArcColor).render()}
                    <div className='secondArc'>
                        {new Arc(this.secondProgress, this.secondColor, this.radius*0.73, this.weight, this.emptyArcColor).render()}
                        <h1 className='clockText'>{this.currentTime}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

