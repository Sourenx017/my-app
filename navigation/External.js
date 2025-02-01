import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack = createNativeStackNavigator();

import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';

export default function External() {
    return (
        <stack.Navigator initialRouteName='Welcome'>
            <stack.Screen 
                name='Login' 
                component={Login} 
                options={{ headerShown: false }}
            />
            <stack.Screen 
                name='Welcome' 
                component={Welcome} 
                options={{ headerShown: false }}
            />
            <stack.Screen 
                name='SignUp' 
                component={SignUp} 
                options={{ headerShown: false }}
            />
        </stack.Navigator>
    )
}

