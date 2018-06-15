import React, { Component } from 'react';
import { connect } from 'react-redux';

import autoBind from 'react-autobind';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    footerContainer: {
        right: 0,
        bottom: 0,
        left: 0,
        // padding: 1rem;
        // background-color: #efefef;
        // text-align: center;


        'background-color': theme.palette.secondary.light,
        // bottom: 0,
        position: 'absolute',
        width: '100%',
        height: '60px',
        padding: theme.spacing.unit,
        // height: 
    },
    footerRow: {
        display: 'flex',
        'justify-content': 'center',
    },
    buttonFooter: {
        color: theme.palette.text.secondary,
    }

});


class Footer extends Component {

    constructor(props) {
        super(props);
        autoBind(this);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.footerContainer}>
                <div className={classes.footerRow}>
                    <Typography variant="caption"><a href="#">About</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Concept</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#">Partners</a></Typography>

                    {/* <Button className={classes.buttonFooter}>About</Button>
                    <Button className={classes.buttonFooter}>Concept</Button>
                    <Button className={classes.buttonFooter}>Partners</Button> */}
                </div>
                <div className={classes.footerRow}>
                    <a href="https://github.com/joaoaguiam/pixel4impact" target="_blank" alt="GitHub repository"><i class="fab fa-github"></i></a>
                </div>
                {/* <Button component={Link} to="/create-campaign">About</Button> */}
                {/* <Typography variant="caption">| Concept | Partners</Typography> */}
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
    };
}


Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(Footer));
