(function () {
    'use strict'

    const {Grid, Row, Col, Panel, Nav, NavItem} = ReactBootstrap

    class App extends React.Component {
        constructor() {
            super()
            this.state = {
				json: '[{"name":"Foo"},{"name":"Bar"}]',
				template: `<ul>
	<li>name</li>
</ul>`,
				result: ''
			}
        }

		handleJSON(e) {
			this.setState({
				json: e.target.value,
				result: this.compileResult()
			})
		}

		handleTemplate(e) {
			this.setState({
				template: e.target.value,
				result: this.compileResult()
			})
		}

		compileResult() {
			const result = 'aaa'

			return result
		}

        render() {
            return (
                <Grid>
                    <Row>
                        <Col md={6}>
                            <Panel header='JSON'>
                                <textarea
									className='form-control'
									onChange={this.handleJSON.bind(this)}
									rows='15'
									value={this.state.json}
								/>
                            </Panel>
                        </Col>
                        <Col md={6}>
                            <Panel header='Template'>
                                <textarea
									className='form-control'
									onChange={this.handleTemplate.bind(this)}
									rows='5'
									value={this.state.template}
								/>
                            </Panel>
                            <Panel header='Result'>
                                <textarea
									className='form-control'
									rows='5'
									value={this.state.result}
									readonly={true}
								/>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }

    ReactDOM.render(<App />, document.getElementById('app'))
})()