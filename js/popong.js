/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component , Animation} from 'react';
import {renderIf, renderIfElse} from "./renderTools";

import {
	StyleSheet,
	View,
	Image,
	StatusBar,
	Dimensions,
	Animated,
	TouchableHighlight,
	Text
} from 'react-native';

const topBarHeight = 70.0
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const gameItemWidth = (((windowHeight - 64) / windowWidth) > 11.0 / 8.0 ? windowWidth : (windowHeight - 64) * (8.0 / 11.0)) / 8
const gameItemHeight = (((windowHeight - 64) / windowWidth) > 11.0 / 8.0 ? windowWidth : (windowHeight - 64) * (8.0 / 11.0)) / 8

var value = Array() // 按钮的位置

export default class Popong extends Component {
	
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			tipViewBounce: new Animated.Value(0.1),
			pauseIconBounce: new Animated.Value(1.0),
			gameItemBounce: new Animated.Value(1.0),
			dispareGameItems: [],
			gamingScore: 0,
			pauseIconAnimating: false,
			tipContainerAnimating: false,
			gameLevel: 1,
			gaming: false,
		};
		this.randomItemValue()
	}
	
	render() {
		return (
			<View style = {{
				flex: 1,
				backgroundColor: '#ffffff'}}>
				<StatusBar hidden={true}/>
				<View style={{
					height: 70,
					backgroundColor: '#ffffff',
					justifyContent: 'center',
					alignItems: 'center'}}>
					{
						renderIf(this.state.pauseIconBounce._value > 0, <TouchableHighlight style={{
							position:'absolute',
							height: topBarHeight - 20,
							width: ((topBarHeight - 40) * 74.0/94.0),
							marginLeft: 10,
							marginTop: 10,
							alignSelf:'flex-start',
							justifyContent: 'center',}} underlayColor='#ffffff' onPressOut={this.state.pauseIconAnimating ? null : ()=>this.pauseGame()}>
							<Animated.Image style={[styles.pauseIcon, {transform:[{scale:this.state.pauseIconBounce}]}]}
							                resizeMode='cover' source={require('./../assets/image/pause_button.png')}/>
						</TouchableHighlight>)
					}
					<Text style={[styles.gameText, {
						fontSize:45,
						marginTop:4}]}>
						0
					</Text>
					<View style={{
						position:'absolute',
						right: 10,
						marginTop: 7,
						height: topBarHeight - 14,
						justifyContent: 'space-around'}}>
						<Text style={[styles.gameText, {
							fontSize:(topBarHeight - 20) / 2,
							textAlign:'right'}]}>
							Top
						</Text>
						<Text style={[styles.gameText, {
							fontSize:(topBarHeight - 20) / 2,
							textAlign:'right'}]}>
							2
						</Text>
					</View>
				
				</View>
				<View style={{
					width:((windowHeight - 64) / windowWidth) > 11.0/8.0 ?
						windowWidth : (windowHeight - 64) * (8.0 / 11.0),
					alignSelf: 'center',
					flexDirection: 'row',
					flexWrap:'wrap'}}>
					{this.addItems()}
				</View>
				{
					renderIf(this.state.tipViewBounce._value > 0, <Animated.Image
						source = {require('./../assets/image/pause_bg.png')}
						style = {{
							position:'absolute',
							width:windowWidth - 40,
							height: (windowWidth - 40) *  1.57,
							marginTop: -(((windowWidth - 40) *  1.57) - windowHeight) / 2,
							alignSelf:'center',
							justifyContent:'flex-end',
							resizeMode: 'cover',
							transform:[{scale:this.state.tipViewBounce}]}}>
						<View style={{
							marginLeft: (windowWidth - 40) * 0.1,
							marginRight: (windowWidth - 40) * 0.1,
							height:(windowWidth - 40) *  1.57 * 0.3,
							justifyContent: 'space-around',
							flexDirection: 'row',
							alignItems: 'center'}}>
							<TouchableHighlight onPressOut={this.state.tipContainerAnimating ? null : ()=>this.homeAction()} underlayColor = '#1DB6DB'>
								<Image style={styles.tipFuncIcon} source={require('./../assets/image/pause_home_button.png')}/>
							</TouchableHighlight>
							<TouchableHighlight onPressOut={this.state.tipContainerAnimating ? null : ()=>this.startGame()} underlayColor = '#1DB6DB'>
								<Image style={styles.tipFuncIcon} source={require('./../assets/image/start_button.png')}/>
							</TouchableHighlight>
							<TouchableHighlight onPressOut={this.state.tipContainerAnimating ? null : ()=>this.soundAction()} underlayColor = '#1DB6DB'>
								<Image style={styles.tipFuncIcon} source={require('./../assets/image/main_sound_button.png')}/>
							</TouchableHighlight>
						</View>
					</Animated.Image>)
				}
			</View>
		);
	}
	
	componentDidMount() {
		this.setState({pauseIconBounce:new Animated.Value(0.0), tipViewBounce:new Animated.Value(0.1), tipContainerAnimating:true}, function () {
			var that = this
			Animated.parallel([this.animateTipView()]).start(function () {
				that.setState({tipContainerAnimating:false, pauseIconAnimating:false})
			})
		})
	}
	
	pauseGame() {
		this.setState({pauseIconBounce:new Animated.Value(1.0), tipViewBounce:new Animated.Value(0.1), tipContainerAnimating:true, pauseIconAnimating:true}, function () {
			var that = this
			Animated.parallel([this.animateTipView(), this.animatePauseIcon()]).start(function () {
				that.setState({tipContainerAnimating:false, pauseIconAnimating:false})
			})
		})
	}
	
	homeAction() {
		this.props.navigator.pop()
	}
	
	startGame() {
		this.setState({pauseIconBounce:new Animated.Value(0.1), tipViewBounce:new Animated.Value(1.0), tipContainerAnimating:true, pauseIconAnimating:true}, function () {
			var that = this
			Animated.parallel([this.animateTipView(), this.animatePauseIcon()]).start(function () {
				that.setState({tipContainerAnimating:false, pauseIconAnimating:false})
			})
		})
	}
	
	soundAction() {
	
	}
	
	animateTipView() {
		return Animated.spring(                          // Base: spring, decay, timing
			this.state.tipViewBounce,                 // Animate `bounceValue`
			{
				toValue: this.state.tipViewBounce._value == 0.1 ? 1.0 : 0.0,                         // Animate to smaller size
				duration: 50,
				// velocity: 20,
				// tension:100
			}
		)
	}
	
	animatePauseIcon() {
		return Animated.spring(
			this.state.pauseIconBounce,
			{
				toValue: this.state.pauseIconBounce._value == 0.1 ? 1.0 : 0.0,
				duration: 50,
				// velocity: 20,
				// tension:100
			}
		)
	}
	
	// 添加子元素
	addItems() {
		var allItems = []
		var bgColors = ['#E6E6E6', '#DCDCDC', '#F0F0F0','#E6E6E6']
		var that = this
		function judgeValue (level, k, a) {
			if (a > 0) {
				if (that.state.dispareGameItems.indexOf(k) > -1) {
					return <Animated.Image style={[{
						position: 'absolute',
						width: gameItemWidth - 2,
						height: gameItemHeight - 2,
						top: 1,
						left: 1,
						resizeMode: 'cover',
						transform:[{scale:that.state.gameItemBounce}]}]}
					                       source={{uri: 'game_stone_tile_'+level+'_'+a}}/>
				} else  {
					return <Image style={{
						position: 'absolute',
						width: gameItemWidth - 2,
						height: gameItemHeight - 2,
						top: 1,
						left: 1,
						resizeMode: 'cover'}}
					              source={{uri: 'game_stone_tile_'+level+'_'+a}}/>
				}
			} else {
				return <View style={{
					width:gameItemWidth,
					height:gameItemHeight}}>
				</View>
			}
		}
		
		for (var row = 0; row < 11; row++)
			for (var col = 0; col < 8; col++) {
				allItems.push(
					<TouchableHighlight key={row * 11 + col * 8} style={{
						width:gameItemWidth,
						height:gameItemHeight,
						backgroundColor : bgColors[(col % 2) + (row % 2 == 0 ? 0 : 2)]}}
					                    onPressOut={value[row][col] != 0 ? null : this.clickAction.bind(this, row, col)}
					                    underlayColor = {bgColors[(col % 2) + (row % 2 == 0 ? 0 : 2)]}>
						{
							judgeValue(this.state.gameLevel, row * 11 + col * 8, value[row][col])
						}
					</TouchableHighlight>
				)
			}
		return allItems
	}
	
	clickAction(row, col) {
		var removeLocatios = this.checkAround(row, col)
		if (removeLocatios.length > 0) {
			// 删除动画
			console.log(removeLocatios)
			for (var index = 0; index < removeLocatios.length; index++) {
				value[parseInt(removeLocatios[index].split(',')[0])][parseInt(removeLocatios[index].split(',')[1])] = 0
			}
			this.forceUpdate()
		} else {
			// 惩罚
			console.log('惩罚')
		}
	}
	
	
	// 检查周围
	checkAround(row, col) {
		var checkLocations = new Array // 检查各格子的 4 * 2数组
		// 左边
		for (var i = col - 1; i >= 0; i--) {
			if (value[row][i] != 0) {
				checkLocations.push(row + ',' + i)
				break
			}
		}
		// 右边
		for (var i = col + 1; i < 8; i++) {
			if (value[row][i] != 0) {
				checkLocations.push(row + ',' + i)
				break
			}
		}
		// 上边
		for (var i = row - 1; i >= 0; i--) {
			if (value[i][col] != 0) {
				checkLocations.push(i + ',' + col)
				break
			}
		}
		// 下边
		for (var i = row + 1; i < 11; i++) {
			if (value[i][col] != 0) {
				checkLocations.push(i + ',' + col)
				break
			}
		}
		
		if (checkLocations.length == 0) {
			return []
		} else {
			var removeLocations = new Array()
			for(var i = 0; i < checkLocations.length; i++) {
				for (var j = 0; j < checkLocations.length; j++) {
					if (i != j) {
						var row1 = checkLocations[i].split(',')[0]
						var col1 = checkLocations[i].split(',')[1]
						var row2 = checkLocations[j].split(',')[0]
						var col2 = checkLocations[j].split(',')[1]
						if (value[row1][col1] == value[row2][col2] && removeLocations.indexOf(row1+','+col1) == -1) {
							removeLocations.push(row1+','+col1)
						}
					}
				}
			}
			if (removeLocations.length == 0) {
				return []
			} else {
				return removeLocations
			}
		}
	}
	
	
	// 随机布局
	randomItemValue() {
		for (var row = 0; row < 11; row++) {
			value[row] = [];
			var emptyIndexes = []
			while (true) {
				if (emptyIndexes.length == 3) {
					break
				}
				var index = parseInt(Math.random() * 7)
				if (emptyIndexes.indexOf(index) == -1) {
					emptyIndexes.push(index)
				}
			}
			for (var col = 0; col < 8; col++) {
				if (emptyIndexes.indexOf(col) > -1) {
					value[row][col] = 0
				} else  {
					value[row][col] = parseInt(Math.random() * 6) + 1;
				}
			}
		}
	}
}

const styles = StyleSheet.create({
	gameText: {
		fontFamily:'norwester',
		color:'#282828'
	},
	pauseIcon: {
		height: topBarHeight - 40,
		width: ((topBarHeight - 40) * 74.0/94.0),
	},
	tipFuncIcon: {
		width: 60,
		height: 60,
	}
});