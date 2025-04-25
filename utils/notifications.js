
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleNotification = async (title, date) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'PlanEasy Reminder',
      body: `Don't forget: ${title}`,
    },
    trigger: { date },
  });
};