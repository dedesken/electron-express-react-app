import React from 'react';
import { DropdownComponent } from '../dropdownComponent/dropdown'
import find from 'lodash.find';
import { SearchInput } from '../searchComponent/searchInput';

export class SelectComponent extends React.PureComponent {
    constructor(props) {
        super(props);

        this.onGlobalKeyDown = this.onGlobalKeyDown.bind(this);
        this.onItemMouseLeave = this.onItemMouseLeave.bind(this);

        this.state = {
            isOpen: this.props.isOpen,
            selectedId: this.props.selectedId
        };
    }

    static getDerivedStateFromProps({ isOpen, selectedId }, prevState) {
        return {
            ...prevState,
            isOpen,
            selectedId
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onGlobalKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onGlobalKeyDown, false);
    }

    onItemClick(selectedId, item) {
        this.setState({
            selectedId,
            isOpen: false
        }, () => {
            if (this.props.onChange) {
                this.props.onChange(item);
            }
        });
    }

    onItemMouseEnter(selectedIndex) {
        this.setState({
            selectedIndex
        });
    }

    onItemMouseLeave() {
        this.setState({
            selectedIndex: null
        });
    }

    onGlobalKeyDown(e) {
        if (this.state.isOpen) {
            // User pressed the down arrow, increment the index
            if (e.keyCode === 40) {
                e.preventDefault();
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    this.setState({
                        selectedIndex: this.state.selectedIndex + 1
                    });
                } else {
                    this.setState({
                        selectedIndex: 0
                    });
                }

                if (this.state.selectedIndex > this.props.items.length - 1) {
                    this.setState({
                        selectedIndex: 0
                    });
                }
            }
            // User pressed the up arrow, decrement the index
            if (e.keyCode === 38) {
                e.preventDefault();
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    this.setState({
                        selectedIndex: this.state.selectedIndex - 1
                    });
                } else {
                    this.setState({
                        selectedIndex: this.props.items.length - 1
                    });
                }

                if (this.state.selectedIndex < 0) {
                    this.setState({
                        selectedIndex: this.props.items.length - 1
                    });
                }
            }
            // User pressed the enter key, update the selectedId
            if (e.keyCode === 13) {
                if (this.state.selectedIndex || this.state.selectedIndex === 0) {
                    const selectedItem = this.props.items[this.state.selectedIndex];
                    this.onItemClick(selectedItem.id, selectedItem);
                }
            }
        }
    }

    getItemClassName(isSelected) {
        return 'SpreadsheetGridSelectItem' +
            (isSelected ? ' SpreadsheetGridSelectItem_selected' : '');
    }

    isHasValue() {
        return this.state.selectedId && this.props.items;
    }

    getHeaderValue() {
        let value;

        if (this.isHasValue()) {
            value = find(this.props.items, {
                id: this.state.selectedId
            });
            value = value ? value.name : value;
        } else {
            value = this.props.placeholder;
        }

        return value;
    }

    getHeaderClassName() {
        return 'SpreadsheetGridSelectHeader' +
            (this.state.isOpen ? ' SpreadsheetGridSelectHeader_open' : '');
    }

    renderHeader() {
        return (
            <div className={this.getHeaderClassName()}>
                <div className="SpreadsheetGridSelectValue">
                    {this.props.filterItems &&  this.state.isOpen ? 
                        <SearchInput disabled={!this.props.condition} filterItems={this.props.filterItems}/>:
                        this.getHeaderValue()}
                </div>
                <button disabled={!this.props.condition} onClick={this.props.toggleModal} className="CreatePostReq">+</button>
            </div>
        );
    }

    renderBody() {
        const items = this.props.items;

        return (
            <div>
                {
                    items && items.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className={this.getItemClassName(i === this.state.selectedIndex)}
                                onClick={this.onItemClick.bind(this, item.id, item)}
                                onMouseEnter={this.onItemMouseEnter.bind(this, i)}
                                onMouseLeave={this.onItemMouseLeave}
                            >
                                {item.name}
                            </div>
                        );
                    })
                }
            </div>
        );
    }

    render() {
        return (
            <DropdownComponent
                header={this.renderHeader()}
                body={this.renderBody()}
                isOpen={this.state.isOpen}
            />
        );
    }
}

SelectComponent.defaultProps = {
    items: [],
    placeholder: '',
    isOpen: false,
    condition: true
};