// ExtendedMusic.js to meet requirements by demonstrating inheritance by extending Music component for additional functionality
import React from 'react';
import Music from './Music';

class ExtendedMusic extends Music {
    constructor(props) {
        super(props);
        this.additionalFunction = this.additionalFunction.bind(this);
    }

    additionalFunction() {
        console.log("Additional functionality in extended component.");
    }

    handleReleaseClick(release, index) {
        super.handleReleaseClick(release, index);
        this.additionalFunction();
    }
}

export default ExtendedMusic;
