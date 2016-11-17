/* CREATE DATABASE Sqlite */ ;
DROP TABLE IF EXISTS base ;
DROP TABLE IF EXISTS configuration ;
DROP TABLE IF EXISTS instant ;
DROP TABLE IF EXISTS session ;
DROP TABLE IF EXISTS thermometer_config ;
DROP TABLE IF EXISTS twitter_config ;

/* Entity - Base */
CREATE TABLE base ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL ) ;
 
/* Entity - Configuration */
CREATE TABLE configuration ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           description                                                      longtext           NOT NULL, 
           notes                                                            longtext           NULL    , 
           target_temperature                                               int                NOT NULL, 
           temperature_unit                                                 varchar( 1 )       NOT NULL, 
           record_temperatures                                              int                NULL    , 
           pid_p                                                            int                NOT NULL, 
           pid_i                                                            double             NOT NULL, 
           pid_d                                                            double             NOT NULL, 
           max_pwm                                                          int                NULL    , 
           tweet_on                                                         int                NULL    , 
           tweet_period_in_minutes                                          int                NULL    , 
           pwm_frequency                                                    int                NULL    , 
           autoseq                                                          int                NULL     ) ;
 
/* Entity - Instant */
CREATE TABLE instant ( 
           timestamp                                                        datetime           NOT NULL, 
           target_temperature                                               int                NOT NULL, 
           therm0                                                           int                NULL    , 
           therm1                                                           int                NULL    , 
           therm2                                                           int                NULL    , 
           therm3                                                           int                NULL    , 
           therm4                                                           int                NULL    , 
           therm5                                                           int                NULL    , 
           therm6                                                           int                NULL    , 
           therm7                                                           int                NULL    , 
           pw_m0                                                            int                NULL    , 
           cpu_temperature                                                  int                NULL    , 
           fk_id_session                                                    INTEGER            NOT NULL ) ;
 
/* Entity - Session */
CREATE TABLE session ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           date                                                             datetime           NOT NULL, 
           end_date                                                         datetime           NULL    , 
           notes                                                            longtext           NULL    , 
           fk_id_configuration                                              INTEGER            NOT NULL ) ;
 
/* Entity - ThermometerConfig */
CREATE TABLE thermometer_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           name                                                             longtext           NOT NULL, 
           alarm_low                                                        int                NULL    , 
           alarm_high                                                       int                NULL    , 
           alarm_on                                                         int                NULL    , 
           autoseq                                                          int                NULL    , 
           fk_id_configuration                                              INTEGER            NOT NULL ) ;
 
/* Entity - TwitterConfig */
CREATE TABLE twitter_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           consumer_key                                                     varchar( 200 )     NULL    , 
           consumer_secret                                                  varchar( 200 )     NULL    , 
           access_token                                                     varchar( 200 )     NULL    , 
           access_token_secret                                              varchar( 200 )     NULL    , 
           username                                                         longtext           NULL    , 
           tweet_period_in_minutes                                          int                NULL     ) ;
 
GRANT ALL ON base TO PUBLIC 
GRANT ALL ON configuration TO PUBLIC 
GRANT ALL ON instant TO PUBLIC 
GRANT ALL ON session TO PUBLIC 
GRANT ALL ON thermometer_config TO PUBLIC 
GRANT ALL ON twitter_config TO PUBLIC 

