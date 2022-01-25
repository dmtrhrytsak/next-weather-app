import Image from 'next/image';
import moment from 'moment-timezone';

const WeeklyWeather = ({ weeklyWeather, timezone }) => {
  return (
    <div className="weekly">
      <h3 className="weekly__title">
        Weekly <span>Weather</span>
      </h3>

      {weeklyWeather.length > 0 &&
        weeklyWeather.map((weather, index) => {
          if (index === 0) {
            return;
          }

          return (
            <div key={weather.dt} className="weekly__card">
              <div className="weekly__inner">
                <div className="weekly__left-content">
                  <div>
                    <h3>
                      {moment.unix(weather.dt).tz(timezone).format('dddd')}
                    </h3>

                    <h4>
                      <span>{weather.temp.max.toFixed(0)}&deg;</span>
                      <span>{weather.temp.min.toFixed(0)}&deg;</span>
                    </h4>
                  </div>

                  <div className="weekly__sun-times">
                    <div>
                      <span>Sunrise</span>
                      <span>
                        {moment.unix(weather.sunrise).tz(timezone).format('LT')}
                      </span>
                    </div>

                    <div>
                      <span>Sunset</span>
                      <span>
                        {moment.unix(weather.sunset).tz(timezone).format('LT')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="weekly__right-content">
                  <div className="weekly__icon-wrapper">
                    <div>
                      <Image
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        layout="fill"
                      />
                    </div>
                  </div>
                  <h5>{weather.weather[0].description}</h5>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeeklyWeather;
