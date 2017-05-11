Feature: Gist management
  As a GitHub API client
  I want to be able to manage gists (read, create, update, delete)

  @gist-get-one-public
  Scenario: Get a gist
    When I GET the gist "gists/2e0a63118e7224eb02351f5ae7176ae8"
    Then get one gist http status should be 200
    And $.url should equal "https://api.github.com/gists/2e0a63118e7224eb02351f5ae7176ae8"

  @gist-star
  Scenario: Start a gist
    When I PUT the gist "gists/2e0a63118e7224eb02351f5ae7176ae8"
    Then star a gist http status should be 204

  @gist-check-if-starred
  Scenario: Start a gist
    When I GET the gist "gists/2e0a63118e7224eb02351f5ae7176ae8" star
    Then is gist starred http status should be 204

  @gist-get-commits
  Scenario: Get gist commits
    When I GET gist "gists/2e0a63118e7224eb02351f5ae7176ae8" commits
    Then get gists commits http status should be 200

  @gist-create
  Scenario: Create a gist
    When I POST the gist with JSON:
    """
    {
      "description": "the description for this gist",
      "public": false,
      "files": {
        "file_one.txt": {
          "content": "String file contents"
        }
      }
    }
    """
    Then create one http status should be 201

  @gist-update
  Scenario: Edit a gist
    When I PATCH the gist with JSON:
    """
    {
      "description": "the description for this gist",
      "public": false,
      "files": {
        "file_one.txt": {
          "content": "String file contents"
        },
        "file_two.txt": {
          "content": "file two - String file contents"
        }
      }
    }
    """
    Then update one gist http status should be 200

  @gist-get-specific-version
  Scenario: Get a specific version gist
    When I GET the specific version gist
    Then get specific version gist http status should be 200

  @gist-delete
  Scenario: Delete a gist
    When I DELETE the gist
    Then delete one gist http status should be 204


  @gist-user-get-all
  Scenario: Get all users gists
    When I GET all users gists
    Then get all users gists http status should be 200

  @gist-user-get-all-starred
  Scenario: Get all users starred gists
    When I GET all users starred gists
    Then get all users gists http status should be 200