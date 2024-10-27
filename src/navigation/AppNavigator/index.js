import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {connect} from 'react-redux'
import {Icon} from 'react-native-elements'

import { getTheme } from '../../redux/theme'
import { DashboardScreen } from "../../screens/Dashboard/index"
import { LoginScreen } from '../../screens/Login'
import { ProfileScreen } from '../../screens/Profile'
import { SessionScreen } from '../../screens/Session'
import { SettingsScreen } from '../../screens/Settings'
import { StatsScreen } from '../../screens/Stats'
import { ClubScreen } from '../../screens/Club'
import { ExploreScreen } from '../../screens/Explore'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const DashboardStackComponent = props => {
  return (
    <Stack.Navigator 
      initialRouteName='Dashboard'
      screenOptions={{
        headerStyle: {backgroundColor: props.theme.bgcNav},
        headerTintColor: props.theme.tint
      }} 
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen}/>
      <Stack.Screen name="Session" component={SessionScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="Club" component={ClubScreen}/>
      <Stack.Screen name="Statistics" component={StatsScreen}/>
    </Stack.Navigator>
  )
}

const mapStateToProps = state => ({
  theme: getTheme(state)
})

const DashboardStack = connect(mapStateToProps)(DashboardStackComponent)

const ProfileStackComponent = props => {
  return (
    <Stack.Navigator 
      initialRouteName='Profile'
      screenOptions={{
        headerStyle: {backgroundColor: props.theme.bgcNav},
        headerTintColor: props.theme.tint
      }} 
    >
      <Stack.Screen name="Session" component={SessionScreen}/>
      <Stack.Screen name="Profile" component={ProfileScreen}/>
      <Stack.Screen name="Club" component={ClubScreen}/>
      <Stack.Screen name="Statistics" component={StatsScreen}/>
    </Stack.Navigator>
  )
}

const ProfileStack = connect(mapStateToProps)(ProfileStackComponent)

const ExploreStackComponent = props => {
  return (
    <Stack.Navigator 
      initialRouteName='Explore'
      screenOptions={{
        headerStyle: {backgroundColor: props.theme.bgcNav},
        headerTintColor: props.theme.tint
      }} 
    >
      <Stack.Screen name="Club" component={ClubScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Session" component={SessionScreen} />
      <Stack.Screen name="Statistics" component={StatsScreen} />
    </Stack.Navigator>
  )
}

const ExploreStack = connect(mapStateToProps)(ExploreStackComponent)

const SettingsStackComponent = props => {
  return (
    <Stack.Navigator 
      initalRouteName='Settings'
      screenOptions={{
        headerStyle: {backgroundColor: props.theme.bgcNav},
        headerTintColor: props.theme.tint
      }} 
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}

const SettingsStack = connect(mapStateToProps)(SettingsStackComponent)

const LoggedInNavigatorComponent = props => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: props.theme.tint, 
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: props.theme.bgcNav
        }
      }}
    >
      <Tab.Screen name="DashboardStack" component={DashboardStack} options={{ title: 'Dashboard', tabBarIcon: ({color}) => <Icon name='home' color={color} /> }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ title: 'Profile', tabBarIcon: ({color}) => <Icon name='home' color={color} /> }} />
      <Tab.Screen name="ExploreStack" component={ExploreStack} options={{ title: 'Explore', tabBarIcon: ({color}) => <Icon name='home' color={color} /> }} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ title: 'Settings', tabBarIcon: ({color}) => <Icon name='home' color={color} /> }} />
    </Tab.Navigator>
  )
}

const LoggedInNavigator = connect(mapStateToProps)(LoggedInNavigatorComponent)

const LoggedOutNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export {LoggedInNavigator, LoggedOutNavigator}


