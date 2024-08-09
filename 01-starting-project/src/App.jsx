import {CORE_CONCEPTS} from './data.js';
import Header from './components/Header/Header.jsx'
import CoreConcept from './components/CoreConcepts.jsx';
import TabButton from './components/TabButton.jsx';



function App() {
  function handleClick(val){
    console.log(val)
}

  return (
    <div>
      <header><h1>Test 123</h1></header>
      <Header />
      <main>
        <section id='core-concepts'>
          <h2>Core Concepts</h2>
          <ul>
           <CoreConcept {...CORE_CONCEPTS[0]} />
           <CoreConcept {...CORE_CONCEPTS[1]} />
           <CoreConcept {...CORE_CONCEPTS[2]} />
           <CoreConcept {...CORE_CONCEPTS[3]} />
          </ul>

        </section>
        <h2>Time to get started!</h2>
        <section id="examples">
          <menu>
            <TabButton onSelect={() =>handleClick('components')}>Components</TabButton>
            <TabButton onSelect={() =>handleClick('jsx')}>JSX</TabButton>
            <TabButton onSelect={() =>handleClick('props')}>Props</TabButton>
            <TabButton onSelect={() =>handleClick('state')}>State</TabButton>
          </menu>
          Dynamic Content
        </section>
      </main>
    </div>
  );
}



export default App;
