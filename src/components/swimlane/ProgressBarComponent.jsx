import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const ProgressBarComponent = ({ classes, percentage }) => {
    const [progress, setProgress] = React.useState(10)

    useEffect(() => {
        setProgress(percentage)
    }, [])

    return (
        <div>
            <LinearProgress thickness={10} variant="determinate" value={progress} classes={{ root: classes.root, colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
        </div>
    )
}

const styles = (props) => ({
    root: {
        height: 10,
    },
    colorPrimary: {
        backgroundColor: '#E3E3E3',
    },
    barColorPrimary: {
        backgroundColor: '#000000',
    },
})

export default withStyles(styles)(ProgressBarComponent)
