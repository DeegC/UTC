/* CREATE DATABASE Sqlite */ ;
DROP TABLE IF EXISTS base ;
DROP TABLE IF EXISTS configuration ;
DROP TABLE IF EXISTS instant ;
DROP TABLE IF EXISTS session ;
DROP TABLE IF EXISTS steinhart_hart_config ;
DROP TABLE IF EXISTS thermometer_config ;
DROP TABLE IF EXISTS thermometer_type ;
DROP TABLE IF EXISTS twitter_config ;
DROP TABLE IF EXISTS utc_config ;

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
           pwm_frequency                                                    int                NULL    , 
           autoseq                                                          int                NULL    , 
           fk_id_thermometer_type                                           INTEGER            NOT NULL ) ;
 
/* Entity - Instant */
CREATE TABLE instant ( 
           timestamp                                                        datetime           NOT NULL, 
           target_temperature                                               double             NOT NULL, 
           therm0                                                           double             NULL    , 
           therm1                                                           double             NULL    , 
           therm2                                                           double             NULL    , 
           therm3                                                           double             NULL    , 
           therm4                                                           double             NULL    , 
           therm5                                                           double             NULL    , 
           therm6                                                           double             NULL    , 
           therm7                                                           double             NULL    , 
           pw_m0                                                            int                NULL    , 
           cpu_temperature                                                  double             NULL    , 
           error                                                            int                NULL    , 
           error_message                                                    longtext           NULL    , 
           fk_id_session                                                    INTEGER            NOT NULL ) ;
 
/* Entity - Session */
CREATE TABLE session ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           date                                                             datetime           NOT NULL, 
           end_date                                                         datetime           NULL    , 
           notes                                                            longtext           NULL    , 
           fk_id_configuration                                              INTEGER            NOT NULL ) ;
 
/* Entity - SteinhartHartConfig */
CREATE TABLE steinhart_hart_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           a                                                                double             NOT NULL, 
           b                                                                double             NOT NULL, 
           c                                                                double             NOT NULL, 
           r                                                                double             NOT NULL, 
           voltage_reference                                                double             NOT NULL, 
           fk_id_thermometer_type                                           INTEGER            NOT NULL ) ;
 
/* Entity - ThermometerConfig */
CREATE TABLE thermometer_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           name                                                             longtext           NOT NULL, 
           alarm_low                                                        int                NULL    , 
           alarm_high                                                       int                NULL    , 
           alarm_on                                                         int                NULL    , 
           autoseq                                                          int                NULL    , 
           fk_id_configuration                                              INTEGER            NOT NULL ) ;
 
/* Entity - ThermometerType */
CREATE TABLE thermometer_type ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           name                                                             varchar( 32 )      NOT NULL, 
           description                                                      longtext           NULL    , 
           probe_algorithm                                                  varchar( 64 )      NULL     ) ;
 
/* Entity - TwitterConfig */
CREATE TABLE twitter_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           consumer_key                                                     varchar( 200 )     NULL    , 
           consumer_secret                                                  varchar( 200 )     NULL    , 
           access_token                                                     varchar( 200 )     NULL    , 
           access_token_secret                                              varchar( 200 )     NULL    , 
           username                                                         longtext           NULL    , 
           tweet_period_in_minutes                                          int                NULL     ) ;
 
/* Entity - UtcConfig */
CREATE TABLE utc_config ( 
           id                                                               INTEGER PRIMARY KEY NOT NULL, 
           fk_id_thermometer_type                                           INTEGER            NOT NULL ) ;
 
GRANT ALL ON base TO PUBLIC 
GRANT ALL ON configuration TO PUBLIC 
GRANT ALL ON instant TO PUBLIC 
GRANT ALL ON session TO PUBLIC 
GRANT ALL ON steinhart_hart_config TO PUBLIC 
GRANT ALL ON thermometer_config TO PUBLIC 
GRANT ALL ON thermometer_type TO PUBLIC 
GRANT ALL ON twitter_config TO PUBLIC 
GRANT ALL ON utc_config TO PUBLIC 

