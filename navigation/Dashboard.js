import { createDrawerNavigator } from '@react-navigation/drawer'; // Update the import statement
const Drawer = createDrawerNavigator();
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';

export default function Dashboard() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}