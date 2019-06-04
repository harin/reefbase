import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import { DestinationList_ } from '../DestinationList'
import About from '../About'
import destinations from './destinations.json'
import { BrowserRouter as Router } from "react-router-dom";
import App from '../App'
import '../App.scss'
import DiveLogForm from '../components/DiveLogForm'
import countries_result from './countries.json'
import divesites from './divesites'
import DiveSiteSelect from '../components/DiveSiteSelect';
import { DiveLogsPage } from '../DiveLogsPage'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
storiesOf('DestionationList', module)
  .add('Loaded', () => (
    <Router>
      <DestinationList_ destinations={destinations} isLoading={false}/>
    </Router>
  ))
  .add('Is loading', () => (
    <Router>
      <DestinationList_ destinations={[]} isLoading={true}/>
    </Router>
  ))
  
storiesOf('About', module)
    .add('about', () => <About />)

const getDiveSitesMock = (_) => {
  return Promise.resolve({
    results: divesites
  }) 
}

storiesOf('DiveLog', module)
    .add('form', () =>  
      <DiveLogForm 
        getDiveSites={getDiveSitesMock}
        countries={countries_result.results}
        diveSites={divesites}
      />)
  .add('select', () => (
    <DiveSiteSelect
      getDiveSites={getDiveSitesMock}
    />
  )
  )
  .add('page', () => {
    return (
      <DiveLogsPage 
        getDiveSites={getDiveSitesMock}
      />
    )
  })