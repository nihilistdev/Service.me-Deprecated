update customers set document_with_weights = setweight(to_tsvector(first_name), 'A') ||
  setweight(to_tsvector(last_name), 'B') ||
    setweight(to_tsvector(coalesce(email, '')), 'C');
CREATE INDEX document_weights_idx
  ON customers
  USING GIN (document_with_weights);
        CREATE FUNCTION customers_tsvector_trigger() RETURNS trigger AS $$
begin
  new.document_with_weights :=
  setweight(to_tsvector('english', coalesce(new.first_name, '')), 'A')
  || setweight(to_tsvector('english', coalesce(new.last_name, '')), 'B')
  || setweight(to_tsvector('english', coalesce(new.email, '')), 'C');
  return new;
end
$$ LANGUAGE plpgsql;
CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
    ON customers FOR EACH ROW EXECUTE PROCEDURE customers_tsvector_trigger();