Feature: Book an appointment with student parents

  In order to collect additional information about a student
  As a teacher
  I want to book an appointment with the students parent

  @watch @critical
  Scenario: Book appointment with parent
    Given "Jon"'s parents provided the contact email "parent@child.net"
    And "Jon" has been registered as a student
    When I book the appointment for "Jon"'s parents for "6/30/2016" at "16:45"
    Then I receive confirmation of the booking
    And the appointment is added to my diary
    #And the parents receive a confirmation email





#  CAN YOU GIVE ME AN EXAMPLE
#  the teacher would consult parents about a possible date to meet up
#  then they woudl make an appontmentn over the phone
#  they would receive a cofirmation email



  #they would meet up on the given date
  #ask questions to validate

  # a reminder is sent 30 days before the meeting