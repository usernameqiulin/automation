import Bone from '@bone/bone-mobile';
import container from './app/layout/global';
import HomePage from './app/page/HomePage';
import SceneNamePage from './app/page/SceneNamePage';
import SceneIconPage from './app/page/SceneIconPage';
import TriggerPage from './app/page/TriggerPage';
import ConditionPage from './app/page/ConditionPage';
import TimerPage from './app/page/TimerPage';
import TimeRange from './app/page/TimeRangePage';
import RepeatPage from './app/page/RepeatPage';
import DevicePage from './app/page/DevicePage';
import FunctionListPage from './app/page/FunctionListPage';
import FunctionPage from './app/page/FunctionPage';

const app = Bone.createApp({
  appName: '',
  container,
  router: {
    routes: [
      {
        path: '/',
        page: HomePage,
      },
      {
        path: '/name',
        page: SceneNamePage,
      },
      {
        path: '/icon',
        page: SceneIconPage,
      },
      {
        path: '/addTrigger',
        page: TriggerPage,
      },
      {
        path: '/addCondition',
        page: ConditionPage,
      },
      {
        path: '/timer',
        page: TimerPage,
      },
      {
        path: '/timeRange',
        page: TimeRange,
      },
      {
        path: '/repeat',
        page: RepeatPage,
      },
      {
        path: '/deviceList',
        page: DevicePage,
      },
      {
        path: '/functionList',
        page: FunctionListPage,
      },
      {
        path: '/function',
        page: FunctionPage,
      },
    ],
  },
  extensions: {
    middlewares: [], // 目前仅支持标准redux中间件
  },
});

app.start();
