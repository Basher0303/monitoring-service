import moment from 'moment';
import 'moment/dist/locale/ru';
moment.locale('ru');

export default {
	install(app) {
		app.config.globalProperties.$moment = moment;
	}
};
