"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { awards } from "@/lib/content/awards";
import { certifications } from "@/lib/content/certifications";

type RecognitionDetail = {
  title: string;
  copy?: string;
  image?: string;
  imageHeight?: number;
  imageWidth?: number;
};

export function Recognition() {
  const [selectedItem, setSelectedItem] = useState<RecognitionDetail | null>(null);
  const selectedCopy = selectedItem?.copy?.trim();

  return (
    <section className="section bg-light border-top border-bottom">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Awards and certifications</span>
            <h2 className="display-headline display-5 text-balance">
              Recognition
            </h2>
          </Col>
        </Row>
        <Row className="gy-4 mb-5">
          {awards.map((award, i) => (
            <Col key={`${award.title}-${i}`} sm={6} md={3} className="d-flex">
              <div className="impact-stat recognition-card">
                {(award.image || award.copy?.trim()) && (
                  <button
                    type="button"
                    className="recognition-card__action"
                    aria-label={`View ${award.title} details`}
                    title={`View ${award.title} details`}
                    onClick={() => setSelectedItem(award)}
                  >
                    <Plus size={14} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                )}
                <div className="fw-semibold">{award.title}</div>
                {award.detail && <div className="text-secondary small mt-1">{award.detail}</div>}
                <div className="recognition-card__company">{award.company}</div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="eyebrow mt-5">Certifications</div>
        <Row className="gy-3 mt-1">
          {certifications.map((cert) => (
            <Col key={cert.title} md={6} lg={4} className="d-flex">
              <div className="recognition-card recognition-card--cert small">
                {(cert.image || cert.copy?.trim()) && (
                  <button
                    type="button"
                    className="recognition-card__action"
                    aria-label={`View ${cert.title} details`}
                    title={`View ${cert.title} details`}
                    onClick={() => setSelectedItem(cert)}
                  >
                    <Plus size={14} strokeWidth={2.25} aria-hidden="true" />
                  </button>
                )}
                <div className="fw-semibold">{cert.title}</div>
                <div className="text-secondary">
                  {cert.issuer} · {cert.date}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      <Modal
        show={selectedItem !== null}
        onHide={() => setSelectedItem(null)}
        centered
        size="lg"
        aria-labelledby="recognition-detail-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="recognition-detail-title">{selectedItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem?.image && (
            <Image
              src={selectedItem.image}
              alt={selectedItem.title}
              width={selectedItem.imageWidth ?? 1200}
              height={selectedItem.imageHeight ?? 800}
              sizes="(min-width: 992px) 760px, calc(100vw - 2rem)"
              className="recognition-card__modal-image"
            />
          )}
          {selectedCopy && (
            <p className="recognition-card__modal-copy">{selectedCopy}</p>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
}
