import { Button, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { eventActions } from "../../actions/eventActions";
import { AppState } from "../../store";
import { Event } from "../../types/Event";
import { BaseTable, BaseTableHeader, BaseTableRow } from "../basic/BaseTable";

interface Props {
    events: Event[]
    readEvents(): void
}

const EventIndex: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate()

    useEffect(() => {
        props.readEvents()
    }, [])

    const renderTitleLink = (event: Event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
            {event.title}
        </Link>
    )

    const header: BaseTableHeader = {
        id: 'ID',
        title: 'Title',
        body: 'Body'
    }

    const rows: BaseTableRow[] = useMemo(() => {
        return props.events.map((event: Event) => (
            {
                id: event.id,
                title: renderTitleLink(event),
                body: event.body
            }
        ))
    }, [props.events])

    return (
        <React.Fragment>
            <Typography variant="h2" component="div" gutterBottom>
                イベント一覧
            </Typography>
            <BaseTable header={header} rows={rows} />
            <Button variant="outlined" onClick={() => navigate('/events/new')}>
                新規イベント作成
            </Button>
        </React.Fragment>
    )
}

const mapStateToProps = (appState: AppState) => {
    return {
        events: appState.eventIndexState.events
    }
}

const mapDispatchToProps = (dispatch: Function) => {
    return {
        readEvents: async () => {
            await dispatch(eventActions.readEventsAsync())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventIndex)
