import React, { useState } from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
} from 'react-native';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    /****** Q4: Start Coding here. State the correct IP/port******/
    const response = await fetch('http://10.0.2.2:3000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
      /****** Q4: Code Ends here******/
    });
    const body = await response.text();
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}

class IssueFilter extends React.Component {
  render() {
    return (
      <>
        {/****** Q1: Start Coding here. ******/}
        <Text>Placeholder for IssueFilter</Text>
        {/****** Q1: Code ends here ******/}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { backgroundColor: '#537791', flexDirection: 'row', flexWrap: 'wrap' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  row: { backgroundColor: '#E7E6E1', flexDirection: 'row', flexWrap: 'wrap' },
  cell: { textAlign: 'center', borderWidth: 1, borderColor: '#ccc', flex: 1 }
});

const width = [40, 80, 80, 80, 80, 80, 200];

function IssueRow(props) {
  const issue = props.issue;
  {/****** Q2: Coding Starts here. Create a row of data in a variable******/ }
  // const data = [
  //   {
  //     id: issue.id,
  //     title: issue.title,
  //     status: issue.status,
  //     owner: issue.owner,
  //     effort: issue.effort,
  //     created: issue.created,
  //     due: issue.due
  //   }
  // ]
  {/****** Q2: Coding Ends here.******/ }
  return (
    <View style={styles.row}>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <Text style={styles.cell}>{issue.id}</Text>
      <Text style={styles.cell}>{issue.title}</Text>
      <Text style={styles.cell}>{issue.status}</Text>
      <Text style={styles.cell}>{issue.owner}</Text>
      <Text style={styles.cell}>{issue.effort}</Text>
      <Text style={styles.cell}>{issue.created.toDateString()}</Text>
      <Text style={styles.cell}>{issue.due ? issue.due.toDateString() : "Unsettled"}</Text>
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}


function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue.id} issue={issue} />
  );

  {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/ }

  {/****** Q2: Coding Ends here. ******/ }


  return (
    <View style={styles.container}>
      {/****** Q2: Start Coding here to render the table header/rows.**********/}
      <View style={styles.header}>
        <Text style={styles.cell}>ID</Text>
        <Text style={styles.cell}>Title</Text>
        <Text style={styles.cell}>Status</Text>
        <Text style={styles.cell}>Owner</Text>
        <Text style={styles.cell}>Effort</Text>
        <Text style={styles.cell}>Created Date</Text>
        <Text style={styles.cell}>Due Date</Text>
      </View>
      {issueRows}
      {/****** Q2: Coding Ends here. ******/}
    </View>
  );
}


class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.issueList = new IssueList();
    /****** Q3: Start Coding here. Create State to hold inputs******/
    this.state = {
      issue: {
        title: '',
        status: 'New',
        owner: '',
        effort: null,
        due: null
      }
    }
    /****** Q3: Code Ends here. ******/
  }

  /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  setIssue(field, value) {
    this.setState(prevState => ({
      issue: {
        ...prevState.issue,
        [field]: value
      }
    }));
  };
  initState() {
    this.setState({
      issue: {
        title: '',
        status: 'New',
        owner: '',
        effort: null,
        due: null
      }
    });
  }
  /****** Q3: Code Ends here. ******/

  async handleSubmit() {
    /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
    const newIssue = this.state.issue;
    console.log(newIssue);
    // if (!newIssue.status || newIssue.status === '') {
    //   newIssue.status = 'New';
    // }
    const data = await this.issueList.createIssue(newIssue);
    this.props.loadData();
    this.initState();
    this.newTitleInput.clear();
    this.newStatusInput.clear();
    this.newOwnerInput.clear();
    this.newEffortInput.clear();
    this.newDueInput.clear();
    /****** Q3: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput ref={input => { this.newTitleInput = input }} placeholder='Issue Title' onChangeText={newTitle => this.setIssue('title', newTitle)} />
        <TextInput ref={input => { this.newStatusInput = input }} placeholder='Issue Status' onChangeText={newStatus => this.setIssue('status', newStatus)} />
        <TextInput ref={input => { this.newOwnerInput = input }} placeholder='Issue Owner' onChangeText={newOwner => this.setIssue('owner', newOwner)} />
        <TextInput ref={input => { this.newEffortInput = input }} placeholder='Issue Effort' onChangeText={newEffort => this.setIssue('effort', newEffort)} />
        <TextInput ref={input => { this.newDueInput = input }} placeholder='Issue Due' onChangeText={newDue => this.setIssue('due', newDue)} />
        <Button onPress={this.handleSubmit} title='Add New Issue' />
        {/****** Q3: Code Ends here. ******/}
      </View>
    );
  }
}

class BlackList extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    /****** Q4: Start Coding here. Create State to hold inputs******/
    this.state = { name: '' };
    /****** Q4: Code Ends here. ******/
  }
  /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
  setName(newname) {
    this.setState({ name: newname });
  }
  /****** Q4: Code Ends here. ******/

  async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const query = `mutation ($newname: String!){
      addToBlacklist(nameInput: $newname)
    }`;
    const newname = this.state.name;
    console.log(newname);
    const data = await graphQLFetch(query, { newname });
    this.newnameInput.clear();
    /****** Q4: Code Ends here. ******/
  }

  render() {
    return (
      <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <TextInput ref={input => { this.newnameInput = input }} placeholder='Name to Blacklist' onChangeText={newname => this.setName(newname)} />
        <Button onPress={this.handleSubmit} title='Add to Blacklist' />
        {/****** Q4: Code Ends here. ******/}
      </View>
    );
  }
}

export default class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [], selector: 1 };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    // console.log(data)
    if (data) {
      this.loadData();
    }
  }

  setSelector(value) {
    this.setState({ selector: value });
    // console.log(this.state.selector);
  }


  render() {
    return (
      <>
        <View>
          <Button onPress={() => this.setSelector(1)} title='Issue Table' />
          <Button onPress={() => this.setSelector(2)} title='Add Issue' />
          <Button onPress={() => this.setSelector(3)} title='Blacklist' />
        </View>
        {this.state.selector === 1 ? (
          <>
            <IssueFilter />
            <IssueTable issues={this.state.issues} />
          </>
        ) : null}
        {this.state.selector === 2 ? <IssueAdd loadData={this.loadData.bind(this)} /> : null}
        {this.state.selector === 3 ? <BlackList /> : null}
      </>
    )
  }
}
