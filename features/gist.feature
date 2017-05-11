Feature: Get gist details
  As a GitHub API client
  I want to see the details of a gist

  Scenario: Get a gist
    When I GET the gist "gists/2e0a63118e7224eb02351f5ae7176ae8"
    Then the http status should be 200
    And $.url should equal "https://api.github.com/gists/2e0a63118e7224eb02351f5ae7176ae8"