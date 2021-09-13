import React from 'react';
import {getMergeSortAnimations} from '../../sortingAlgorithms/sortingAlgorithms'
import './SortingVisualizer.css';
// Change this value for the speed of the animations.
const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
const ANIMATION_SPEED_MS = width / 500;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#1554FF';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }
    componentDidMount() {
        this.resetArray();
    };
    resetArray() {
        const array = [];
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const maxLines = vw * 0.3;
        const maxHeight = vh * 0.81;
        for (let i = 0; i < maxLines; i++) {
            array.push(randomIntFromInterval(5, maxHeight));
        };
        this.setState({array});
    };
    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    };
    render(){
        const { array } = this.state;
        return (
            <div>
                <div className="nav-container">
                    <nav>
                        <button className='button' onClick={() => this.resetArray()}>Generate New Array</button>
                        <button id='mergeSort' className='button' onClick={() => this.mergeSort()}>Merge Sort</button>
                    </nav>
                </div>
                <div className="array-container">
                    <div className='array-container'>
                        {array.map((value, idx) => {
                            return <div 
                            className='array-bar'
                            key={idx}
                            style={{
                                height: `${value}px`
                            }}></div>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}