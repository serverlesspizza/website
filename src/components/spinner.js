import React from 'react';


const spinner = function() {
	return (
		<div className="spinner">
			<svg width="150px" height="150px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
				 preserveAspectRatio="xMidYMid" className="lds-double-ring">
				<circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}"
						ng-attr-stroke="{{config.c1}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none"
						stroke-linecap="round" r="40" stroke-width="4" stroke="#51CACC"
						stroke-dasharray="62.83185307179586 62.83185307179586" transform="rotate(137.625 50 50)">
					<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50"
									  keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
				</circle>
				<circle cx="50" cy="50" ng-attr-r="{{config.radius2}}" ng-attr-stroke-width="{{config.width}}"
						ng-attr-stroke="{{config.c2}}" ng-attr-stroke-dasharray="{{config.dasharray2}}"
						ng-attr-stroke-dashoffset="{{config.dashoffset2}}" fill="none" stroke-linecap="round" r="35"
						stroke-width="4" stroke="#9DF871" stroke-dasharray="54.97787143782138 54.97787143782138"
						stroke-dashoffset="54.97787143782138" transform="rotate(-137.625 50 50)">
					<animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;-360 50 50"
									  keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animateTransform>
				</circle>
			</svg>
		</div>
	)
}

export default spinner;
