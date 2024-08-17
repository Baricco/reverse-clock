import ArcProgress from 'react-arc-progress';
import React from 'react';
import './Arc.css';

export default class Arc {

    constructor(progress, color, radius, weight, backgroundColor) {
        this.progress = progress;
        this.color = color;
        this.radius = radius;
        this.weight = weight;
        this.backgroundColor = backgroundColor;
    }
  
  render() {    
    return (
        <div className="arc">
            <ArcProgress
                arcStart={-90}
                arcEnd={270}
                progress={this.progress}
                size={this.radius}
                fillColor={this.color}
                thickness={this.weight}
                animation={true}
                emptyColor={this.backgroundColor}
            />
        </div>
    );
  }
}

