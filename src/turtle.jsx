/* global BigInt */

import React from 'react'

class Turtle extends React.Component {
    constructor() {
        super()
        this.n_lines = 20
        this.state = {
            gw: [],
            selected_block: 1,
            top_block: 1,
            lines: [],
            block: {},
        }
    }

    componentDidMount() {
        fetch("https://gist.githubusercontent.com/anonanonymous/96d7a777c3ce5a067f95d77378b6befa/raw/c4d1b659bab51057243e2a144801006e0f53a557/gistfile1.txt")
            .then(data => {
                data.text().then(text => this.setState({
                    gw: text.split("\n"),
                },
                    () => {
                        if (this.props.match.params.height) {
                            this.setState({
                                selected_block: parseInt(this.props.match.params.height, 10)
                            }, () => this.updateBlock(this.state.selected_block))
                        }
                        else {
                            setInterval(this.updateBlock, 3000)
                        }
                    }))
            })
    }

    updateBlock = (height = "top") => {
        fetch("https://blockapi.turtlepay.io/block/header/" + height)
            .then(data => data.json())
            .then(data => {
                if (this.state.block === null || data.height !== this.state.block.height) {
                    let ln = this.get_line_number(data)
                    console.log("line: " + ln)
                    this.setState({
                        block: data,
                        top_block: data.height,
                        selected_block: this.state.top_block === this.state.selected_block ? data.height : this.state.selected_block,
                        lines: this.state.gw.slice(ln, ln + this.n_lines),
                    })
                }
            })
    }

    /* the line number is the blockhash + nonce */
    get_line_number = (block) => (
        parseInt((BigInt("0x" + block.hash) + BigInt(block.nonce)) % BigInt(this.state.gw.length - this.n_lines), 10)
    )

    render() {
        console.log("state:", this.state)
        let lines = this.state.lines.map((line, i) => <code key={i} className="gw-line">{line}</code>)
        return (
            <div>
                <h2 style={this.state.lines.length ? { display: "none" } : {}}>
                    Entertaining God...
                </h2>
                <div style={!this.state.lines.length ? { display: "none" } : {}}>
                    <h4>Hash: {this.state.block.hash}</h4>
                    <h4>Nonce: {this.state.block.nonce}</h4>
                    <h4>Timestamp: {this.state.block.timestamp}</h4>
                    <h3>Passage for block: {this.state.block.height}</h3>
                    <div className="gw-container">
                        <a href={
                            this.props.match.params.height ?
                                this.state.selected_block + 1 :
                                "#"
                        } className="gw-nav">&lt;</a>
                        <div>{lines}</div>
                        <a href={
                            this.state.selected_block - 1
                        } className="gw-nav">&gt;</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Turtle