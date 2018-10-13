import React from 'react';
import { 
	StyleSheet,
	View,
	Text,
	TextInput,
} from 'react-native';


export default class Component2 extends React.Component {


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

                                <View style={styles.item1}>
										<TextInput 
											style={styles.item1TextInput}
											value=''
											placeholder='Username'
											underlineColorAndroid={'transparent'}
											placeholderTextColor={'rgba(24,24,24,1)'}
										/>
									</View>

                			</View>

                		</View>

                	</View>
                	<View style={styles.layout2}>

                		<View style={styles.itemcontainer2}>

                			<View style={styles.itemcontainer2Inner}>

                                <View style={styles.item2}>
										<TextInput 
											style={styles.item2TextInput}
											value=''
											placeholder='Password'
											secureTextEntry={true}
											underlineColorAndroid={'transparent'}
											placeholderTextColor={'rgba(24,24,24,1)'}
										/>
									</View>

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
	    paddingLeft: 37.5,
	    paddingRight: 37.5,
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
	    width: '100%',
	    height: '100%',
	    justifyContent: 'center',
	    padding: 10,
	    overflow: 'hidden',
	    backgroundColor: 'rgba(255,255,255,0.8)',
	    borderRadius: 0,
	    borderStyle: 'solid',
	    borderWidth: 1,
	    borderColor: 'rgba(255,255,255,1)',
	},
	
	item1TextInput: {
	    color: 'rgba(24,24,24,1)',
	    fontSize: 11,
	    textAlign: 'left',
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
	    width: '100%',
	    height: '100%',
	    justifyContent: 'center',
	    padding: 10,
	    overflow: 'hidden',
	    backgroundColor: 'rgba(255,255,255,0.8)',
	    borderRadius: 0,
	    borderStyle: 'solid',
	    borderWidth: 1,
	    borderColor: 'rgba(255,255,255,1)',
	},
	
	item2TextInput: {
	    color: 'rgba(24,24,24,1)',
	    fontSize: 11,
	    textAlign: 'left',
	    letterSpacing: 1,
	    width: '100%',
	},
	
});