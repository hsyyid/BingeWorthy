import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
} from 'react-native';


export default class Component3 extends React.Component {


    render() {

        if (!this.props.visible) {
            return false;
        }


        return (

            <View
                style={styles.component}
            >

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <TouchableOpacity
										style={styles.item1}
									>

										<Text style={styles.item1TouchableOpacity}>
											Login
										</Text>

									</TouchableOpacity>

                			</View>

                		</View>

                	</View>
                	<View style={styles.layout2}>

                		<View style={styles.itemcontainer2}>

                			<View style={styles.itemcontainer2Inner}>

                                <TouchableOpacity
										style={styles.item2}
									>

										<Text style={styles.item2TouchableOpacity}>
											Register
										</Text>

									</TouchableOpacity>

                			</View>

                		</View>

                	</View>

                </View>

            </View>

        );

    }

}

const styles = StyleSheet.create({

	component: {
	    width: '100%',
	    flexDirection: 'column',
	    height: '35%',
	    justifyContent: 'center',
	    paddingLeft: 30,
	    paddingRight: 30,
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	},

	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},

	layout1: {
	    width: '100%',
	    height: 81,
	},

	itemcontainer1: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	},

	itemcontainer1Inner: {
	    width: '100%',
	    height: '100%',
	    position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},

	item1: {
	    backgroundColor: 'rgba(33,150,243,1)',
	    borderWidth: 1,
	    borderColor: 'rgba(255,255,255,1)',
	    borderStyle: 'solid',
	    borderRadius: 6,
	    width: '100%',
	    height: '100%',
	    justifyContent: 'center',
	    alignItems: 'center',
	    overflow: 'hidden',
	    padding: 10,
	},

	item1TouchableOpacity: {
	    color: 'rgba(255,255,255,1)',
	    fontSize: 11,
	    textAlign: 'center',
	    letterSpacing: 1,
	    width: '100%',
	},

	layout2: {
	    width: '100%',
	    height: 81,
	},

	itemcontainer2: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 7.5,
	    paddingBottom: 7.5,
	    paddingLeft: 7.5,
	    paddingRight: 7.5,
	},

	itemcontainer2Inner: {
	    width: '100%',
	    height: '100%',
	    position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},

	item2: {
	    backgroundColor: 'rgba(233,30,99,1)',
	    borderWidth: 1,
	    borderColor: 'rgba(255,255,255,1)',
	    borderStyle: 'solid',
	    borderRadius: 6,
	    width: '100%',
	    height: '100%',
	    justifyContent: 'center',
	    alignItems: 'center',
	    overflow: 'hidden',
	    padding: 10,
	},

	item2TouchableOpacity: {
	    color: 'rgba(255,255,255,1)',
	    fontSize: 11,
	    textAlign: 'center',
	    letterSpacing: 1,
	    width: '100%',
	},

});
