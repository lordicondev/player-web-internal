import animationManager from '../animation/AnimationManager';
import {
    setDefaultCurveSegments,
    getDefaultCurveSegments,
    roundValues,
    setIdPrefix,
    setSubframeEnabled,
    setExpressionsPlugin,
} from '../utils/common';
import PropertyFactory from '../utils/PropertyFactory';
import ShapePropertyFactory from '../utils/shapes/ShapeProperty';
import Matrix from '../3rd_party/transformation-matrix';
import { setLocationHref } from '../global';

const lottie = {};
var standalone = '__[STANDALONE]__';
var animationData = '__[ANIMATIONDATA]__';
var renderer = '';


function setLocation(href) {
    setLocationHref(href);
}

function searchAnimations() {
    if (standalone === true) {
        animationManager.searchAnimations(animationData, standalone, renderer);
    } else {
        animationManager.searchAnimations();
    }
}

function setSubframeRendering(flag) {
    setSubframeEnabled(flag);
}

function setPrefix(prefix) {
    setIdPrefix(prefix);
}

function loadAnimation(params) {
    if (standalone === true) {
        params.animationData = JSON.parse(animationData);
    }
    return animationManager.loadAnimation(params);
}

function setQuality(value) {
    if (typeof value === 'string') {
        switch (value) {
            case 'high':
                setDefaultCurveSegments(200);
                break;
            default:
            case 'medium':
                setDefaultCurveSegments(50);
                break;
            case 'low':
                setDefaultCurveSegments(10);
                break;
        }
    } else if (!isNaN(value) && value > 1) {
        setDefaultCurveSegments(value);
    }
    if (getDefaultCurveSegments() >= 50) {
        roundValues(false);
    } else {
        roundValues(true);
    }
}

function inBrowser() {
    return typeof navigator !== 'undefined';
}

function installPlugin(type, plugin) {
    if (type === 'expressions') {
        setExpressionsPlugin(plugin);
    }
}

function getFactory(name) {
    switch (name) {
        case 'propertyFactory':
            return PropertyFactory;
        case 'shapePropertyFactory':
            return ShapePropertyFactory;
        case 'matrix':
            return Matrix;
        default:
            return null;
    }
}

lottie.play = animationManager.play;
lottie.pause = animationManager.pause;
lottie.setLocationHref = setLocation;
lottie.togglePause = animationManager.togglePause;
lottie.setSpeed = animationManager.setSpeed;
lottie.setDirection = animationManager.setDirection;
lottie.stop = animationManager.stop;
lottie.searchAnimations = searchAnimations;
lottie.registerAnimation = animationManager.registerAnimation;
lottie.loadAnimation = loadAnimation;
lottie.setSubframeRendering = setSubframeRendering;
lottie.resize = animationManager.resize;
// lottie.start = start;
lottie.goToAndStop = animationManager.goToAndStop;
lottie.destroy = animationManager.destroy;
lottie.setQuality = setQuality;
lottie.inBrowser = inBrowser;
lottie.installPlugin = installPlugin;
lottie.freeze = animationManager.freeze;
lottie.unfreeze = animationManager.unfreeze;
lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations;

lottie.setIDPrefix = setPrefix;
lottie.__getFactory = getFactory;
lottie.version = '[[BM_VERSION]]';

export default lottie;
