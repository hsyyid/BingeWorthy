import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

import Component1 from './SignUpComponents/Component1';
import Component2 from './SignUpComponents/Component2';
import Component3 from './SignUpComponents/Component3';

export default class SignUpScreen extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            Component1Visible: true,
            Component2Visible: true,
            Component3Visible: true,
        }

    }

    toggleComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';
        let val  = this.state[prop];
        if (typeof val === 'undefined') {
            return false;
        }

        this.setState({
            [prop]: val === true ? false : true
        })

        return true;

    }

    hideComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: false
        })

        return true;

    }

    showComponent(component = false) {

        if (!component) {
            return false;
        }

        let prop = component + 'Visible';

        this.setState({
            [prop]: true
        })

        return true;

    }

    render() {
        return (


            <View style={styles.container}>

                <View style={styles.screencontainer}>

                    <View style={styles.screencontainerInner}>

                        <Component1
                            navigation={this.props.navigation}
                            toggleComponent={ (component) => this.toggleComponent(component) }
                            hideComponent={ (component) => this.hideComponent(component) }
                            showComponent={ (component) => this.showComponent(component) }
                            visible={ this.state.Component1Visible }
                        />
                        <Component2
                            navigation={this.props.navigation}
                            toggleComponent={ (component) => this.toggleComponent(component) }
                            hideComponent={ (component) => this.hideComponent(component) }
                            showComponent={ (component) => this.showComponent(component) }
                            visible={ this.state.Component2Visible }
                        />
                        <Component3
                            navigation={this.props.navigation}
                            toggleComponent={ (component) => this.toggleComponent(component) }
                            hideComponent={ (component) => this.hideComponent(component) }
                            showComponent={ (component) => this.showComponent(component) }
                            visible={ this.state.Component3Visible }
                        />

                    </View>

                </View>

            </View>

        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

	screencontainer: {
	    backgroundColor: 'rgba(74,144,226,1)',
	    flex: 1,
	},

	screencontainerInner: {
	    flex: 1,
	},

});
