/**
 * Created by zhangheng on 2017/3/24.
 */

import React, { Component } from 'react';
import Popong from './popong'
import {
	Navigator,
	View,
	TouchableHighlight,
	Text,
	StatusBar,
	Alert
} from 'react-native';

class HomeMenu extends Component {
	render() {
		return(
			<View >
				<StatusBar barStyle="light-content"/>
				<View style={{height:64, backgroundColor: '#162baa', alignItems: 'center', justifyContent:'center'}}>
					<Text style={{height:44, top:20, color:'white', fontSize:17, textAlign:'center'}}>
						主页
					</Text>
				</View>
				<View style={{
					height: 200,
					backgroundColor:'#35aa42',
					justifyContent: 'space-around',
					// flexDirection: 'row',
					alignItems: 'center'}}>
					<TouchableHighlight underlayColor='#35aa42' onPressOut={()=>this.intoPopong()}>
						<Text style={{fontSize:30}}>
							popong
						</Text>
					</TouchableHighlight>
					
					<TouchableHighlight underlayColor='#35aa42' onPressOut={()=>Alert.alert('提示', '没有什么新的功能了')}>
						<Text style={{fontSize:30}}>
							Alert
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
	
	intoPopong() {
		this.props.navigator.push({
			name:'Popong',
			component: Popong
		})
	}
}

export default class NavigatorController extends Component {
	render() {
		let defaultName = 'Home'
		let defaultComponet  = HomeMenu
		return (
			<Navigator
				initialRoute={{name: defaultName, component: defaultComponet}}
				configureScene={(route) => {
					console.log(route)
					return Navigator.SceneConfigs.HorizontalSwipeJump;
				}}
				renderScene={(route, navigator) => {
					let Component = route.component;
					return <Component {...route.params} navigator={navigator} />
				}}/>
		)
	}
}