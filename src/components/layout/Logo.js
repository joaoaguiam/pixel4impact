import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    logoColor: {
        color: theme.palette.secondary.main,
    },
    logoBold: {
        'font-weight': 400,
    }
});


class Logo extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const { classes } = this.props;
        let variant = this.props.big ? 'display1' : 'title';
        return (
            <div>
                <Typography variant={variant}>
                    <i className={"fas fa-hand-holding-heart " + classes.logoColor}></i>Pixel<span className={classes.logoColor + " " + classes.logoBold}>4</span>Impact
                </Typography>
            </div>

        )
    }
}


function mapStateToProps(state) {
    return {
    };
}


Logo.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(Logo));
