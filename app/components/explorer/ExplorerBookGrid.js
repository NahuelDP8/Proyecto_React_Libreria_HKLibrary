'use client';

import { Container, Row, Col, Button} from "react-bootstrap";
import BookCardGrid from "../bookCardGrid/bookCardGrid";
import {ArrowLeft} from "phosphor-react";

export default function ExplorerBookGrid({books, onClickBackBtn, children}){
    return (
        <Container className="text-center">
            <Row>
                <Col xs={12} sm={2}>
                    <Button onClick={onClickBackBtn}><ArrowLeft size={32} weight="bold" /></Button>
                </Col>
                <Col xs={12} sm={8}>
                    {children}
                </Col>
                <Col xs={12} sm={2}>
                </Col>
            </Row>
            <Row>
                <BookCardGrid books={books}></BookCardGrid>
            </Row>
        </Container>
    )
}